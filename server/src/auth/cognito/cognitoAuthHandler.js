import { refreshCognitoToken } from './cognitoAuthManager.js';

/**
 * Cognito authentication handler.
 * It manages refreshing expired Cognito tokens.
 * 
 * @param {Object} event - The API Gateway event, containing the request data.
 * @returns {Object} - The response with the necessary tokens or error.
 */
export const cognitoAuthHandler = async (event) => {
  try {
    // Parse the event body to extract the Cognito refresh token
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { cognitoRefreshToken } = body;

    // Log input for debugging purposes
    console.log(`Received Cognito Refresh Token: ${cognitoRefreshToken}`);

    // If the refresh token exists, try refreshing the Cognito tokens
    if (cognitoRefreshToken) {
      const refreshedTokens = await refreshCognitoToken(cognitoRefreshToken);
      console.log('Refreshed Cognito tokens successfully:', refreshedTokens);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Refreshed Cognito tokens successfully.',
          refreshedTokens,  // Return the refreshed tokens to the client
        }),
      };
    }

    // If no refresh token is provided, return an error response
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request. Cognito refresh token is required.' }),
    };
  } catch (error) {
    console.error('Error in Cognito auth handler:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Cognito authentication failed.', error: error.message }),
    };
  }
};
