import { getCodeVerifier, deleteCodeVerifier } from '../session/authSessionManager.js';  // Code verifier management
import { exchangeSpotifyToken } from '../spotify/spotifyTokenManager.js';  // Token exchange for Spotify
import { createUserInCognito, getUserFromCognito, updateCognitoUser } from '../cognito/cognitoUserHandler.js';  // Cognito user management
import { storeUserInDynamoDB, getUserFromDynamoDB, updateUserInDynamoDB } from '../../users/userService.js';  // DynamoDB user services
import axios from 'axios';

export const spotifyCallbackHandler = async (event) => {
  const code = event.queryStringParameters?.code;
  const userId = event.queryStringParameters?.state;  // This is the temporary ID or Spotify user ID.

  if (!code || !userId) {
    console.error('Authorization code or userId missing in the callback');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Authorization code or User ID missing.' }),
    };
  }

  // Retrieve the code verifier from session manager
  const codeVerifier = await getCodeVerifier(userId);
  if (!codeVerifier) {
    console.error(`Code verifier not found for user: ${userId}`);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Code verifier not found.' }),
    };
  }

  try {
    // Step 1: Exchange Spotify authorization code for access and refresh tokens
    const { access_token, refresh_token, expires_in } = await exchangeSpotifyToken(code, codeVerifier);
    console.log('Spotify token exchange successful');

    // Step 2: Retrieve Spotify profile using the access token
    const spotifyUserProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    console.log('Spotify profile retrieved:', spotifyUserProfile.data);

    // Extract essential data from Spotify profile
    const { id: spotifyUserId, email: spotifyEmail, country, product, display_name, images } = spotifyUserProfile.data;
    const spotifyProfileImageUrl = images.length > 0 ? images[0].url : null;
    console.log(`Retrieved profile for user: ${spotifyUserId}, email: ${spotifyEmail}, display name: ${display_name}, profile image URL: ${spotifyProfileImageUrl}`);

    // Step 3: Check if user exists in Cognito by email
    const cognitoUser = await getUserFromCognito(spotifyEmail);

    if (cognitoUser) {
      console.log(`Existing Cognito user found: ${spotifyEmail}`);

      // Step 4: Check if user exists in DynamoDB by Spotify ID
      const existingUser = await getUserFromDynamoDB(spotifyUserId, 'SpotifyUserId');
      
      if (existingUser) {
        console.log(`User already exists in DynamoDB: ${spotifyUserId}`);

        // Update user tokens and attributes in DynamoDB
        await updateUserInDynamoDB(existingUser.UserId, {
          AccessToken: access_token,
          RefreshToken: refresh_token,
          TokenExpiresAt: Math.floor(Date.now() / 1000) + expires_in,
          SpotifyProfileImageUrl: spotifyProfileImageUrl,  // Update Spotify profile image URL in DynamoDB
        });

        // Optionally update Cognito with refresh token and profile image if available
        const cognitoAttributes = {};
        if (refresh_token) cognitoAttributes['custom:spotify_r_token'] = refresh_token;
        if (spotifyProfileImageUrl) cognitoAttributes['custom:spotify_image'] = spotifyProfileImageUrl;
        if (Object.keys(cognitoAttributes).length) {
          await updateCognitoUser(existingUser.UserId, cognitoAttributes);
        }

        // Return essential user information to the frontend
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Returning user authenticated successfully',
            user: {
              UserId: existingUser.UserId,
              SpotifyUserId: spotifyUserId,
              Email: spotifyEmail,
              DisplayName: display_name,
              Country: country,
              Product: product,
              SpotifyProfileImageUrl: spotifyProfileImageUrl,
            },
          }),
        };
      }

    } else {
      // Step 5: If the user doesn't exist, create them in Cognito and DynamoDB
      const cognitoAttributes = {
        'custom:spotify_user_id': spotifyUserId,
        'custom:spotify_r_token': refresh_token,
        'custom:spotify_country': country,
        'custom:spotify_product': product,
        'custom:display_name': display_name,
      };
      if (spotifyProfileImageUrl) cognitoAttributes['custom:spotify_image'] = spotifyProfileImageUrl;

      const cognitoSub = await createUserInCognito(spotifyEmail, cognitoAttributes);

      console.log(`New user created in Cognito with sub: ${cognitoSub}`);

      // Store new user in DynamoDB
      await storeUserInDynamoDB({
        UserId: cognitoSub,
        SpotifyUserId: spotifyUserId,
        Email: spotifyEmail,
        Country: country,
        SpotifyProduct: product,
        RefreshToken: refresh_token,
        AccessToken: access_token,
        TokenExpiresAt: Math.floor(Date.now() / 1000) + expires_in,
        DisplayName: display_name,
        SpotifyProfileImageUrl: spotifyProfileImageUrl,
      });

      console.log(`New user stored in DynamoDB with sub: ${cognitoSub}`);

      // Return essential user information to the frontend for a new user
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'New user authenticated and created successfully',
          user: {
            UserId: cognitoSub,
            SpotifyUserId: spotifyUserId,
            Email: spotifyEmail,
            DisplayName: display_name,
            Country: country,
            Product: product,
            SpotifyProfileImageUrl: spotifyProfileImageUrl,
          },
        }),
      };
    }
  } catch (error) {
    console.error('Token exchange or user creation failed:', error.message, error.response?.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to handle Spotify callback', error: error.message }),
    };
  } finally {
    // Delete the code verifier after use
    await deleteCodeVerifier(userId);
  }
};
