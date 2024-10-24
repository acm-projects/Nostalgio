import { CognitoIdentityProviderClient, AdminInitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

/**
 * Authenticate the user with Cognito using a Spotify access token.
 * 
 * @param {string} spotifyAccessToken - The access token obtained from Spotify.
 * @returns {Object} - The authentication result (Cognito tokens).
 */
export const authenticateWithSpotifyToken = async (spotifyAccessToken) => {
  const authParams = {
    AuthFlow: 'CUSTOM_AUTH',  // Using custom flow since we authenticate via Spotify token
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      'USERNAME': 'spotify_user',  // Using Spotify's unique identifier
      'SPOTIFY_TOKEN': spotifyAccessToken,  // Pass the Spotify access token here
    },
  };

  try {
    const result = await cognitoClient.send(new AdminInitiateAuthCommand(authParams));
    return result.AuthenticationResult;  // Return the Cognito tokens
  } catch (error) {
    console.error('Error authenticating user in Cognito:', error);
    throw new Error('Failed to authenticate user in Cognito');
  }
};

/**
 * Refresh Cognito tokens using the refresh token from Cognito.
 * 
 * @param {string} refreshToken - The refresh token used to get new access and ID tokens.
 * @returns {Object} - The refreshed tokens.
 */
export const refreshCognitoTokens = async (refreshToken) => {
  const refreshParams = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',  // Using the refresh token flow
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      'REFRESH_TOKEN': refreshToken,
    },
  };

  try {
    const result = await cognitoClient.send(new AdminInitiateAuthCommand(refreshParams));
    return result.AuthenticationResult;  // Return new access and ID tokens
  } catch (error) {
    console.error('Error refreshing Cognito tokens:', error);
    throw new Error('Failed to refresh Cognito tokens');
  }
};
