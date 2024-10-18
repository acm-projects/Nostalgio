import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

/**
 * Store a new memory in DynamoDB MemoriesTable.
 * 
 * @param {Object} memoryData - The memory data to be stored.
 * @param {string} memoryData.memoryId - Unique ID for the memory (Spotify playlist ID).
 * @param {string} memoryData.userId - The user ID associated with the memory.
 * @param {string} memoryData.city - City associated with the memory.
 * @param {string} memoryData.name - Name of the memory or trip.
 * @param {string} memoryData.startDate - Start date of the memory.
 * @param {string} memoryData.art - URL to the artwork associated with the memory.
 * @param {string} memoryData.spotifyUrl - URL link to the Spotify playlist.
 */
export const storeMemoryInDynamoDB = async (memoryData) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    Item: {
      memoryId: memoryData.memoryId,
      userId: memoryData.userId,
      city: memoryData.city,
      name: memoryData.name,
      startDate: memoryData.startDate,
      art: memoryData.art,
      spotifyUrl: memoryData.spotifyUrl,
    },
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log(`Memory stored successfully with memoryId: ${memoryData.memoryId} for userId: ${memoryData.userId}`);
  } catch (error) {
    console.error('Error storing memory in DynamoDB:', error);
    throw new Error('Failed to store memory');
  }
};

/**
 * Retrieve a memory from DynamoDB by memoryId.
 * 
 * @param {string} memoryId - The unique memory ID (Spotify playlist ID).
 * @returns {Object|null} - The memory data retrieved from DynamoDB or null if not found.
 */
export const getMemoryFromDynamoDB = async (memoryId) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    Key: { memoryId },
  };

  try {
    const result = await dynamoDb.send(new GetCommand(params));
    if (result.Item) {
      console.log(`Memory retrieved for memoryId: ${memoryId}`);
      return result.Item;
    } else {
      console.log(`Memory not found for memoryId: ${memoryId}`);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving memory from DynamoDB:', error);
    throw new Error('Failed to retrieve memory');
  }
};

/**
 * Update a memory in DynamoDB MemoriesTable by memoryId.
 * 
 * @param {string} memoryId - The unique memory ID (Spotify playlist ID).
 * @param {Object} updates - The updates to apply to the memory.
 */
export const updateMemoryInDynamoDB = async (memoryId, updates) => {
  if (!memoryId || !updates || Object.keys(updates).length === 0) {
    throw new Error('Invalid parameters: memoryId and updates are required.');
  }

  const updateExpressions = [];
  const expressionAttributeValues = {};

  // Construct update expressions dynamically from the provided updates
  Object.entries(updates).forEach(([key, value]) => {
    updateExpressions.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = value;
  });

  const params = {
    TableName: process.env.MEMORIES_TABLE,
    Key: { memoryId },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await dynamoDb.send(new UpdateCommand(params));
    console.log(`Memory updated successfully for memoryId: ${memoryId}`, result.Attributes);
    return result.Attributes;
  } catch (error) {
    console.error('Error updating memory in DynamoDB:', error);
    throw new Error('Failed to update memory');
  }
};

/**
 * Delete a memory from DynamoDB MemoriesTable by memoryId.
 * 
 * @param {string} memoryId - The unique memory ID (Spotify playlist ID).
 */
export const deleteMemoryFromDynamoDB = async (memoryId) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    Key: { memoryId },
  };

  try {
    await dynamoDb.send(new DeleteCommand(params));
    console.log(`Memory deleted for memoryId: ${memoryId}`);
  } catch (error) {
    console.error('Error deleting memory from DynamoDB:', error);
    throw new Error('Failed to delete memory');
  }
};

/**
 * List all memories for a user from DynamoDB by userId, distinguishing ongoing and past trips.
 * 
 * @param {string} userId - The user ID to list memories for.
 * @returns {Object} - An object with categorized "ongoing" memory and "trips" for the user.
 */
export const listMemoriesFromDynamoDB = async (userId) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    IndexName: 'UserMemoryIndex',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: { ':userId': userId },
  };

  try {
    // Query DynamoDB with the provided parameters
    const result = await dynamoDb.send(new QueryCommand(params));
    const memories = result.Items || [];
    let ongoing = null;
    const trips = [];

    // Categorize each memory as ongoing or completed based on the endDate
    for (const memory of memories) {
      const { memoryId, startDate, endDate, name, art, city } = memory;
      if (!endDate) {
        ongoing = { id: memoryId, city, startDate, art };
      } else {
        trips.push({ id: memoryId, startDate, endDate, name, art, city });
      }
    }

    console.log(`Retrieved ${memories.length} memories for userId: ${userId}, categorized as ${trips.length} completed trips and ${ongoing ? '1 ongoing trip' : 'no ongoing trips'}.`);
    return { ongoing, trips };
  } catch (error) {
    console.error(`Error listing memories for userId: ${userId}`, error);
    throw new Error('Failed to list memories');
  }
};


/**
 * Retrieve all memories for a user from a specific city, distinguishing ongoing and past trips.
 * 
 * @param {string} userId - The user ID for which to retrieve memories.
 * @param {string} city - The city for which to retrieve memories.
 * @returns {Object} - An object with categorized "ongoing" memory and "trips" for the specified city.
 */
export const getCityMemoriesFromDynamoDB = async (userId, city) => {
  const params = {
    TableName: process.env.MEMORIES_TABLE,
    IndexName: 'CityUserIndex',  // Use CityUserIndex to query by userId and city
    KeyConditionExpression: 'userId = :userId AND city = :city',  // Querying based on userId and city
    ExpressionAttributeValues: { 
      ':userId': userId,
      ':city': city 
    },
  };

  try {
    // Execute the query with the specified parameters
    const result = await dynamoDb.send(new QueryCommand(params));
    const memories = result.Items || [];
    let ongoing = null;
    const trips = [];

    // Process and categorize each memory into ongoing or trips based on the endDate field
    for (const memory of memories) {
      const { memoryId, startDate, endDate, name, art } = memory;
      if (!endDate) {
        // If endDate is not defined, classify as an ongoing trip
        ongoing = { id: memoryId, city, startDate, art };
      } else {
        // Otherwise, classify as a completed trip
        trips.push({ id: memoryId, startDate, endDate, name, art });
      }
    }

    console.log(`Retrieved ${memories.length} memories for userId: ${userId} in city: ${city}`);
    console.log(`Ongoing trip: ${ongoing ? 'Yes' : 'No'}, Completed trips: ${trips.length}`);
    return { ongoing, trips };
  } catch (error) {
    // Log and re-throw the error for better visibility and troubleshooting
    console.error(`Error retrieving memories for userId: ${userId} in city: ${city}`, error);
    throw new Error('Failed to retrieve city memories');
  }
};
