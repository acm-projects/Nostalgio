import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand, QueryCommand, BatchGetCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

/**
 * Store or create a user in DynamoDB UsersTable.
 * 
 * @param {Object} userData - The user data to be stored in DynamoDB.
 * @param {string} userData.UserId - The Cognito `sub` (UserId).
 * @param {string} userData.SpotifyUserId - The Spotify User ID.
 * @param {string} userData.Email - The user's email from Spotify.
 * @param {string} userData.Country - Spotify country.
 * @param {string} userData.SpotifyProduct - Spotify subscription type.
 * @param {string} userData.RefreshToken - Spotify refresh token.
 * @param {string} userData.AccessToken - Spotify access token.
 * @param {number} userData.TokenExpiresAt - Unix timestamp for when the token expires.
 * @param {string} [userData.DisplayName] - The user's display name from Spotify (optional).
 * @param {string} [userData.spotifyProfileImageUrl] - URL for the user's Spotify profile image (optional).
 * @param {string} [userData.customProfileImageUrl] - URL for the user's custom profile image uploaded to S3 (optional).
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
      TokenExpiresAt: userData.TokenExpiresAt,
      DisplayName: userData.DisplayName || null,
      SpotifyProfileImageUrl: userData.spotifyProfileImageUrl || null,  // Spotify profile image URL
      CustomProfileImageUrl: userData.customProfileImageUrl || null,    // Custom profile image URL
    },
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log(`User stored/updated in DynamoDB with UserId: ${userData.UserId}`);
  } catch (error) {
    console.error('Error storing user in DynamoDB:', error);
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
    params.Key = { UserId: id };
  } else if (keyType === 'SpotifyUserId') {
    params.IndexName = 'SpotifyUserIdIndex';
    params.KeyConditionExpression = 'SpotifyUserId = :spotifyUserId';
    params.ExpressionAttributeValues = { ':spotifyUserId': id };
  } else {
    console.warn('Invalid key type specified for DynamoDB query');
    return null;
  }

  try {
    const result = keyType === 'UserId'
      ? await dynamoDb.send(new GetCommand(params))
      : await dynamoDb.send(new QueryCommand(params));
    console.log(`Retrieved user by ${keyType}: ${id}`);
    return result.Item || result.Items?.[0] || null;
  } catch (error) {
    console.error(`Failed to retrieve user by ${keyType}:`, error);
    throw new Error('Failed to retrieve user');
  }
};

/**
 * Update a user's custom profile image URL in DynamoDB UsersTable.
 * 
 * @param {string} userId - The Cognito `sub` (UserId).
 * @param {string} customProfileImageUrl - The URL of the custom profile image uploaded to S3.
 */
export const updateUserCustomProfileImage = async (userId, customProfileImageUrl) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: { UserId: userId },
    UpdateExpression: 'SET CustomProfileImageUrl = :CustomProfileImageUrl',
    ExpressionAttributeValues: {
      ':CustomProfileImageUrl': customProfileImageUrl,
    },
  };

  try {
    await dynamoDb.send(new UpdateCommand(params));
    console.log(`Custom profile image URL updated for user with UserId: ${userId}`);
  } catch (error) {
    console.error(`Error updating custom profile image URL for user ${userId}:`, error);
    throw new Error('Failed to update custom profile image URL');
  }
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

/**
 * Retrieves all users from the UsersTable, excluding the current user.
 * 
 * @param {string} currentUserId - The ID of the current user.
 * @returns {Array} - An array of user objects excluding the current user.
 */
export const getAllUsersExceptCurrent = async (currentUserId) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    ProjectionExpression: 'UserId, Email, DisplayName, SpotifyUserId, SpotifyProfileImageUrl, CustomProfileImageUrl',  // Fetch only relevant fields
  };

  try {
    const result = await dynamoDb.send(new ScanCommand(params));
    const allUsers = result.Items || [];
    const filteredUsers = allUsers.filter((user) => user.UserId !== currentUserId);
    console.log(`Retrieved ${filteredUsers.length} users, excluding the current user with UserId: ${currentUserId}`);
    
    return filteredUsers;
  } catch (error) {
    console.error('Error retrieving users from DynamoDB:', error);
    throw new Error('Failed to retrieve users');
  }
};

/**
 * Retrieves details for multiple users by UserId, used for follower and following lists.
 * 
 * @param {Array<string>} userIds - The list of UserId values to retrieve.
 * @returns {Array<Object>} - The list of user objects with relevant details.
 */
export const getUsersByIds = async (userIds) => {
  const keys = userIds.map((userId) => ({ UserId: userId }));
  const params = {
    RequestItems: {
      [process.env.USERS_TABLE]: {
        Keys: keys,
        ProjectionExpression: 'UserId, Email, DisplayName, SpotifyUserId, SpotifyProfileImageUrl, CustomProfileImageUrl',  // Only necessary fields
      },
    },
  };

  try {
    const result = await dynamoDb.send(new BatchGetCommand(params));
    console.log(`Retrieved details for ${result.Responses[process.env.USERS_TABLE].length} users`);
    return result.Responses[process.env.USERS_TABLE];
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details');
  }
};
