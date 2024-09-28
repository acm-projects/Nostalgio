import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

/**
 * Store a new memory in DynamoDB MemoriesTable.
 * 
 * @param {Object} memoryData - The memory data to be stored in DynamoDB.
 * @param {string} memoryData.UserId - The Cognito `sub` (UserId).
 * @param {string} memoryData.MemoryId - Unique ID for the memory.
 * @param {string} memoryData.Location - Location where the memory was created.
 * @param {string} memoryData.Timestamp - Timestamp for when the memory was created.
 * @param {Array<string>} memoryData.Songs - List of Spotify song URIs associated with the memory.
 */
export const storeMemoryInDynamoDB = async (memoryData) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    Item: {
      UserId: memoryData.UserId,
      MemoryId: memoryData.MemoryId,
      Location: memoryData.Location,
      Timestamp: memoryData.Timestamp,
      Songs: memoryData.Songs,
    },
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log(`Memory stored in DynamoDB for UserId: ${memoryData.UserId}, MemoryId: ${memoryData.MemoryId}`);
  } catch (error) {
    console.error(`Error storing memory in DynamoDB:`, error);
    throw new Error('Failed to store memory in DynamoDB');
  }
};

/**
 * Retrieve a memory from DynamoDB MemoriesTable.
 * 
 * @param {string} userId - The Cognito `sub` (UserId).
 * @param {string} memoryId - Unique ID of the memory.
 * @returns {Object} - The memory data retrieved from DynamoDB.
 */
export const getMemoryFromDynamoDB = async (userId, memoryId) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    Key: {
      UserId: userId,
      MemoryId: memoryId,
    },
  };

  try {
    const result = await dynamoDb.send(new GetCommand(params));
    if (result.Item) {
      console.log(`Retrieved memory: ${memoryId} for UserId: ${userId}`);
      return result.Item;
    } else {
      console.log(`Memory not found for UserId: ${userId}, MemoryId: ${memoryId}`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving memory from DynamoDB:`, error);
    throw new Error('Failed to retrieve memory');
  }
};

/**
 * Update a memory in DynamoDB MemoriesTable.
 * 
 * @param {string} userId - The Cognito `sub` (UserId).
 * @param {string} memoryId - Unique ID of the memory.
 * @param {Object} updates - The updates to apply to the memory.
 */
export const updateMemoryInDynamoDB = async (userId, memoryId, updates) => {
  const updateExpressions = [];
  const expressionAttributeValues = {};

  // Build update expressions for each field that is being updated
  Object.keys(updates).forEach((key) => {
    updateExpressions.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = updates[key];
  });

  const params = {
    TableName: process.env.MEMORIES_TABLE,
    Key: {
      UserId: userId,
      MemoryId: memoryId,
    },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  try {
    await dynamoDb.send(new UpdateCommand(params));
    console.log(`Memory updated in DynamoDB for UserId: ${userId}, MemoryId: ${memoryId}`);
  } catch (error) {
    console.error(`Error updating memory in DynamoDB:`, error);
    throw new Error('Failed to update memory');
  }
};

/**
 * Delete a memory from DynamoDB MemoriesTable.
 * 
 * @param {string} userId - The Cognito `sub` (UserId).
 * @param {string} memoryId - Unique ID of the memory.
 */
export const deleteMemoryFromDynamoDB = async (userId, memoryId) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    Key: {
      UserId: userId,
      MemoryId: memoryId,
    },
  };

  try {
    await dynamoDb.send(new DeleteCommand(params));
    console.log(`Memory deleted from DynamoDB for UserId: ${userId}, MemoryId: ${memoryId}`);
  } catch (error) {
    console.error(`Error deleting memory from DynamoDB:`, error);
    throw new Error('Failed to delete memory');
  }
};

/**
 * List all memories for a user from DynamoDB MemoriesTable.
 * 
 * @param {string} userId - The Cognito `sub` (UserId).
 * @returns {Array<Object>} - List of memories for the user.
 */
export const listMemoriesFromDynamoDB = async (userId) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    KeyConditionExpression: 'UserId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };

  try {
    const result = await dynamoDb.send(new QueryCommand(params));
    if (result.Items) {
      console.log(`Retrieved ${result.Items.length} memories for UserId: ${userId}`);
      return result.Items;
    } else {
      console.log(`No memories found for UserId: ${userId}`);
      return [];
    }
  } catch (error) {
    console.error(`Error listing memories from DynamoDB:`, error);
    throw new Error('Failed to list memories');
  }
};
