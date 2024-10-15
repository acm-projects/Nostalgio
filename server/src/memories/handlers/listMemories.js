import { listMemoriesFromDynamoDB } from '../memoryService.js';

/**
 * Lambda handler to list all memories for a user from DynamoDB.
 * 
 * @param {Object} event - The API Gateway event containing path parameters.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.userId - The user ID for which to list memories.
 * @returns {Object} - HTTP response with the list of memories or an error message.
 */
export const listMemoriesHandler = async (event) => {
  const { userId } = event.pathParameters;

  // Validate that userId is provided
  if (!userId) {
    console.warn('User ID is required to list memories.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'User ID is required.' }),
    };
  }

  try {
    // Retrieve the list of memories for the user from DynamoDB
    console.log(`Listing memories for userId: ${userId}`);
    const memories = await listMemoriesFromDynamoDB(userId);

    // Check if memories are found
    console.log(`Retrieved ${memories.length} memories for userId: ${userId}`);
    return {
      statusCode: 200,
      body: JSON.stringify(memories),
    };
  } catch (error) {
    // Log the error and return a failure response
    console.error(`Error listing memories for userId: ${userId}`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to list memories',
        error: error.message,
      }),
    };
  }
};
