import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

/**
 * Store or create a user in DynamoDB UsersTable.
 * 
 * @param {Object} userData - The user data to be stored in DynamoDB.
 * @param {string} userData.UserId - The Cognito `sub` (UserId).
 * @param {string} userData.SpotifyUserId - The Spotify User ID.
 * @param {string} userData.Email - The user's email from Cognito.
 * @param {string} userData.Country - Spotify country.
 * @param {string} userData.SpotifyProduct - Spotify subscription type.
 * @param {string} userData.RefreshToken - Spotify refresh token.
 * @param {string} userData.AccessToken - Spotify access token.
 * @param {number} userData.TokenExpiresAt - Unix timestamp for when the token expires.
 */
export const storeUserInDynamoDB = async (userData) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    Item: {
      UserId: userData.UserId,
      SpotifyUserId: userData.SpotifyUserId,
      Email: userData.Email,
      Country: userData.Country,
      SpotifyProduct: userData.SpotifyProduct,
      RefreshToken: userData.RefreshToken,
      AccessToken: userData.AccessToken,
      TokenExpiresAt: userData.TokenExpiresAt
    },
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log(`User stored/updated in DynamoDB with UserId: ${userData.UserId}`);
  } catch (error) {
    console.error(`Error storing user in DynamoDB:`, error);
    throw new Error('Failed to store user in DynamoDB');
  }
};

/**
 * Retrieve a user from DynamoDB by either UserId (Cognito sub) or SpotifyUserId.
 * 
 * @param {string} id - The UserId (Cognito sub) or SpotifyUserId to query.
 * @param {string} keyType - Type of key to query by ('UserId' or 'SpotifyUserId').
 * @returns {Object|null} - The user data retrieved from DynamoDB, or null if not found.
 */
export const getUserFromDynamoDB = async (id, keyType = 'UserId') => {
  const params = {
    TableName: process.env.USERS_TABLE,
  };

  if (keyType === 'UserId') {
    // Query by UserId (Cognito sub)
    params.Key = { UserId: id };
    try {
      const result = await dynamoDb.send(new GetCommand(params));
      return result.Item || null;
    } catch (error) {
      throw new Error(`Failed to retrieve user by ${keyType}: ${error.message}`);
    }
  } else if (keyType === 'SpotifyUserId') {
    // Query by SpotifyUserId using the GSI
    params.IndexName = 'SpotifyUserIdIndex';
    params.KeyConditionExpression = 'SpotifyUserId = :spotifyUserId';
    params.ExpressionAttributeValues = { ':spotifyUserId': id };

    try {
      const result = await dynamoDb.send(new QueryCommand(params));
      return result.Items?.[0] || null;
    } catch (error) {
      throw new Error(`Failed to retrieve user by ${keyType}: ${error.message}`);
    }
  }

  return null;
};

/**
 * Update a user in DynamoDB UsersTable.
 * 
 * @param {string} userId - The Cognito `sub` (UserId).
 * @param {Object} updates - The updates to apply to the user (only specified fields will be updated).
 */
export const updateUserInDynamoDB = async (userId, updates) => {
  const updateExpressions = [];
  const expressionAttributeValues = {};

  // Build update expressions for each field that is being updated
  Object.keys(updates).forEach((key) => {
    updateExpressions.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = updates[key];
  });

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: { UserId: userId },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  try {
    await dynamoDb.send(new UpdateCommand(params));
    console.log(`User updated in DynamoDB with UserId: ${userId}`);
  } catch (error) {
    console.error(`Error updating user in DynamoDB:`, error);
    throw new Error('Failed to update user');
  }
};

/**
 * Delete a user from DynamoDB UsersTable.
 * 
 * @param {string} userId - The Cognito `sub` (UserId).
 */
export const deleteUserFromDynamoDB = async (userId) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: { UserId: userId },
  };

  try {
    await dynamoDb.send(new DeleteCommand(params));
    console.log(`User deleted from DynamoDB with UserId: ${userId}`);
  } catch (error) {
    console.error(`Error deleting user from DynamoDB:`, error);
    throw new Error('Failed to delete user');
  }
};
