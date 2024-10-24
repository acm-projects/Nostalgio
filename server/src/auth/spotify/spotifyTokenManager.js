import axios from 'axios';
import { updateUserHandler } from '../../users/handlers/updateUser.js';  // Handler for updating users in DynamoDB
import { updateCognitoUser } from '../cognito/cognitoUserHandler.js';  // Handler for updating Cognito user attributes
import { getSpotifyTokens } from '../session/authSessionManager.js';

/**
 * Exchange Spotify authorization code for access and refresh tokens.
 * 
 * @param {string} code - The authorization code received from Spotify.
 * @param {string} codeVerifier - The code verifier used to validate the code exchange.
 * @returns {Object} - The response containing the access and refresh tokens.
 */
export const exchangeSpotifyToken = async (code, codeVerifier) => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        code_verifier: codeVerifier,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    console.log('Spotify token exchange successful');
    return response.data;
  } catch (error) {
    console.error('Spotify token exchange failed:', error);
    throw new Error('Failed to exchange Spotify token');
  }
};

/**
 * Validates the Spotify access token, checks if it is expired, and refreshes it if necessary.
 * 
 * @param {object} event - The event object, typically containing path parameters.
 * @returns {Object} - The valid Spotify access token or an error message.
 */
export const validateSpotifyToken = async (event) => {
    try {
      // Extract userId (Cognito sub) from the path parameters in the event
      const { userId } = event.pathParameters;
  
      if (!userId) {
        throw new Error('userId is missing from the path parameters');
      }
  
      // Log the start of token validation
      console.log(`Starting token validation for user: ${userId}`);
  
      // Retrieve tokens from DynamoDB (fetch by userId/Cognito sub)
      const tokens = await getSpotifyTokens(userId);
  
      if (!tokens) {
        throw new Error(`No tokens found for user: ${userId}`);
      }
  
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const tokenExpiryTime = tokens.TokenExpiresAt;  // Token expiration time stored in DynamoDB
      const refreshThreshold = 300;  // Set threshold to 5 minutes (300 seconds)
  
      console.log(`Current time: ${currentTime}, Token expires at: ${tokenExpiryTime}`);
  
      // Check if the token is still valid but within the refresh threshold
      if (currentTime < tokenExpiryTime && (tokenExpiryTime - currentTime) > refreshThreshold) {
        console.log(`Token is still valid for user: ${userId} and above the threshold`);
        return {
          statusCode: 200,
          body: JSON.stringify({ accessToken: tokens.AccessToken }),
        };
      }
  
      // If token is close to expiration or expired, refresh it
      console.log(`Token is either expired or close to expiring for user: ${userId}, refreshing token...`);
      const newTokens = await refreshSpotifyToken({ body: JSON.stringify({ refreshToken: tokens.RefreshToken, userId }) });
  
      // Log the successful token refresh
      console.log(`Successfully refreshed token for user: ${userId}`);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ accessToken: newTokens.accessToken }),
      };
  
    } catch (error) {
      console.error(`Error during token validation for user: ${userId} - ${error.message}`);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: `Token validation failed for user: ${userId}` }),
      };
    }
  };
  
/**
 * Refresh Spotify tokens using the refresh token and update the user in DynamoDB and Cognito.
 * 
 * @param {object} event - The event object containing the request data.
 * @returns {Object} - The new access and refresh tokens.
 */
export const refreshSpotifyToken = async (event) => {
  try {
    const { refreshToken, userId } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    // Log the input values for better debugging
    console.log(`Received refreshToken: ${refreshToken}`);
    console.log(`Received userId: ${userId}`);
    
    // Ensure the refreshToken and userId are valid strings
    if (typeof refreshToken !== 'string' || typeof userId !== 'string') {
      throw new Error('refreshToken and userId must be strings');
    }

    // Make the request to refresh the Spotify tokens
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    console.log('Spotify token refresh response:', response.data);

    const { access_token, refresh_token: newRefreshToken, expires_in } = response.data;

    // Prepare the token updates
    const tokenUpdates = {
      AccessToken: access_token,
      TokenExpiresAt: Math.floor(Date.now() / 1000) + expires_in,
    };

    if (newRefreshToken) {
      tokenUpdates.RefreshToken = newRefreshToken;
    }

    // Call updateUserHandler to update the user in DynamoDB
    await updateUserHandler({
      pathParameters: { userId },
      body: JSON.stringify(tokenUpdates),
    });

    // Update Cognito if a new refresh token was issued
    if (newRefreshToken) {
      console.log(`Updating Cognito with new refresh token for user: ${userId}`);
      await updateCognitoUser(userId, { 'custom:spotify_r_token': newRefreshToken });
    } else {
      console.log(`No new refresh token issued for user: ${userId}`);
    }

    console.log(`Spotify tokens refreshed for user: ${userId}`);
    return { accessToken: access_token, refreshToken: newRefreshToken || refreshToken };

  } catch (error) {
    console.error('Failed to refresh Spotify tokens:', error.response?.data || error.message);
    throw new Error('Token refresh failed');
  }
};
