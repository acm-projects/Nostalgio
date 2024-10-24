import { getCodeVerifier, deleteCodeVerifier } from '../session/authSessionManager.js';  // Updated reference for code verifier
import { exchangeSpotifyToken } from '../spotify/spotifyTokenManager.js';  // Token exchange for Spotify
import { createUserInCognito, getUserFromCognito, updateCognitoUser } from '../cognito/cognitoUserHandler.js';  // Updated imports for Cognito
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
    // Exchange Spotify authorization code for access and refresh tokens
    const { access_token, refresh_token, expires_in } = await exchangeSpotifyToken(code, codeVerifier);
    console.log('Spotify token exchange successful');

    // Log the access token before making the profile request
    console.log('Access token:', access_token);

    // Get the Spotify user's profile using the access token
    const spotifyUserProfile = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    console.log('Spotify profile retrieved:', spotifyUserProfile.data);

    const { id: spotifyUserId, email: spotifyEmail, country, product } = spotifyUserProfile.data;
    console.log(`Spotify profile retrieved for user: ${spotifyUserId}, email: ${spotifyEmail}`);

    // Step 1: Check if the user already exists in Cognito using their email
    const cognitoUser = await getUserFromCognito(spotifyEmail);

    if (cognitoUser) {
      console.log(`Cognito user found: ${spotifyEmail}`);

      // Step 2: Update the existing user in DynamoDB and Cognito with the new tokens
      const existingUser = await getUserFromDynamoDB(spotifyUserId, 'SpotifyUserId');
      
      if (existingUser) {
        console.log(`User already exists in DynamoDB: ${spotifyUserId}`);

        // Update existing user tokens in DynamoDB
        await updateUserInDynamoDB(existingUser.UserId, {
          AccessToken: access_token,
          RefreshToken: refresh_token,  // If a new refresh token was provided
          TokenExpiresAt: Math.floor(Date.now() / 1000) + expires_in,
        });

        // Optionally update tokens in Cognito if needed
        if (refresh_token) {
            await updateCognitoUser(existingUser.UserId, { 'custom:spotify_r_token': refresh_token });
        }

        // Redirect to the appropriate page (for returning users)
        return {
          statusCode: 302,
          headers: { Location: '/dashboard' },  // Redirect returning users to the dashboard
        };
      }

    } else {
      // Step 3: If the user doesn't exist, create them in Cognito and DynamoDB
      const cognitoSub = await createUserInCognito(spotifyEmail, {
        'custom:spotify_user_id': spotifyUserId,
        'custom:spotify_r_token': refresh_token,
        'custom:spotify_country': country,
        'custom:spotify_product': product
      });

      console.log(`New user created in Cognito with sub: ${cognitoSub}`);

      // Store the new user in DynamoDB
      await storeUserInDynamoDB({
        UserId: cognitoSub,
        SpotifyUserId: spotifyUserId,
        Email: spotifyEmail,
        Country: country,
        SpotifyProduct: product,
        RefreshToken: refresh_token,
        AccessToken: access_token,
        TokenExpiresAt: Math.floor(Date.now() / 1000) + expires_in,
      });

      console.log(`New user stored in DynamoDB with sub: ${cognitoSub}`);

      // Redirect new users to the welcome page
      return {
        statusCode: 302,
        headers: { Location: '/welcome' },  // Adjust this to the correct route for your mobile app onboarding
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
