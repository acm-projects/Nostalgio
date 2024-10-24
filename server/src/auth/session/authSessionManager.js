import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

/**
 * Store the PKCE code verifier for a user in the AuthSessionData table.
 * 
 * This function stores the PKCE code verifier for the OAuth flow. The verifier
 * expires after 10 minutes to ensure security.
 * 
 * @param {string} userId - The user's ID (Cognito sub).
 * @param {string} codeVerifier - The PKCE code verifier to store.
 */
export const storeCodeVerifier = async (userId, codeVerifier) => {
  const params = {
    TableName: process.env.AUTH_SESSION_TABLE,  // Use environment variable for AuthSessionData table
    Item: {
      UserId: userId,  // Store by UserId (Cognito sub)
      CodeVerifier: codeVerifier,  // PKCE code verifier
      ExpiresAt: Math.floor(Date.now() / 1000) + 600,  // Expire in 10 minutes
    },
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log(`Successfully stored code verifier for user: ${userId}`);
  } catch (error) {
    console.error(`Error storing code verifier for user ${userId}:`, error);
    throw new Error('Failed to store code verifier');
  }
};

/**
 * Retrieve the PKCE code verifier for a user from the AuthSessionData table.
 * 
 * This function retrieves the stored PKCE code verifier for a user based on their UserId.
 * 
 * @param {string} userId - The user's ID (Cognito sub).
 * @returns {string|null} - The stored code verifier, or null if not found.
 */
export const getCodeVerifier = async (userId) => {
  const params = {
    TableName: process.env.AUTH_SESSION_TABLE,  // Use environment variable for AuthSessionData table
    Key: { UserId: userId },  // Look up by UserId (Cognito sub)
  };

  try {
    const result = await dynamoDb.send(new GetCommand(params));
    return result.Item?.CodeVerifier || null;  // Return the code verifier or null if not found
  } catch (error) {
    console.error(`Error retrieving code verifier for user ${userId}:`, error);
    throw new Error('Failed to retrieve code verifier');
  }
};

/**
 * Delete the PKCE code verifier for a user from the AuthSessionData table.
 * 
 * This function deletes the code verifier for a user from the table.
 * 
 * @param {string} userId - The user's ID (Cognito sub).
 */
export const deleteCodeVerifier = async (userId) => {
  const params = {
    TableName: process.env.AUTH_SESSION_TABLE,  // Use environment variable for AuthSessionData table
    Key: { UserId: userId },  // Delete based on UserId (Cognito sub)
  };

  try {
    await dynamoDb.send(new DeleteCommand(params));
    console.log(`Successfully deleted code verifier for user: ${userId}`);
  } catch (error) {
    console.error(`Error deleting code verifier for user ${userId}:`, error);
    throw new Error('Failed to delete code verifier');
  }
};

/**
 * Retrieve Spotify tokens (access and refresh) for a user using the UserId from DynamoDB.
 * 
 * This function retrieves the stored Spotify tokens for a user from the Users table.
 * 
 * @param {string} userId - The user's ID (Cognito sub).
 * @returns {Object|null} - The stored tokens (AccessToken, RefreshToken, TokenExpiresAt), or null if not found.
 */
export const getSpotifyTokens = async (userId) => {
  const params = {
    TableName: process.env.USERS_TABLE,  // Use environment variable for Users table
    Key: { UserId: userId },  // Fetch by UserId (Cognito sub)
  };

  try {
    const result = await dynamoDb.send(new GetCommand(params));

    if (!result.Item) {
      console.log(`No tokens found for user: ${userId}`);
      return null;
    }

    console.log(`Retrieved Spotify tokens for user: ${userId}`);
    return {
      AccessToken: result.Item.AccessToken,
      RefreshToken: result.Item.RefreshToken,
      TokenExpiresAt: result.Item.TokenExpiresAt,
    };
  } catch (error) {
    console.error(`Error retrieving Spotify tokens for user ${userId}:`, error);
    throw new Error('Failed to retrieve Spotify tokens');
  }
};
