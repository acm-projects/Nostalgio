import { getMemoryFromDynamoDB } from '../memoryService.js';

/**
 * Lambda handler to retrieve a memory from DynamoDB by memoryId.
 * 
 * @param {Object} event - The API Gateway event containing path parameters.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.memoryId - The unique ID of the memory to retrieve.
 * @returns {Object} - HTTP response with the memory data or an error message.
 */
export const getMemoryHandler = async (event) => {
  const { memoryId } = event.pathParameters;

  // Validate that memoryId is provided
  if (!memoryId) {
    console.warn('Memory ID is required to retrieve a memory.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Memory ID is required.' }),
    };
  }

  try {
    // Retrieve the memory from DynamoDB
    console.log(`Retrieving memory with memoryId: ${memoryId}`);
    const memory = await getMemoryFromDynamoDB(memoryId);

    // Check if the memory exists
    if (!memory) {
      console.log(`Memory not found for memoryId: ${memoryId}`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Memory not found' }),
      };
    }

    // Return the retrieved memory data
    console.log(`Memory retrieved successfully for memoryId: ${memoryId}`);
    return {
      statusCode: 200,
      body: JSON.stringify(memory),
    };
  } catch (error) {
    // Log the error and return a failure response
    console.error(`Error retrieving memory with memoryId: ${memoryId}`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to get memory',
        error: error.message,
      }),
    };
  }
};
