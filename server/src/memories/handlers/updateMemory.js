import { updateMemoryInDynamoDB } from '../memoryService.js';

/**
 * Lambda handler to update a memory in DynamoDB by memoryId.
 * 
 * @param {Object} event - The API Gateway event containing path parameters and request body.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.memoryId - The unique ID of the memory to update.
 * @param {Object} event.body - The request body containing the updates to apply.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const updateMemoryHandler = async (event) => {
  const { memoryId } = event.pathParameters;
  const updates = JSON.parse(event.body);

  // Validate required parameters
  if (!memoryId || !updates || Object.keys(updates).length === 0) {
    console.warn('Memory ID and update data are required to update a memory.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Memory ID and updates are required.' }),
    };
  }

  try {
    // Attempt to update the memory in DynamoDB
    console.log(`Updating memory with memoryId: ${memoryId} with updates: ${JSON.stringify(updates)}`);
    await updateMemoryInDynamoDB(memoryId, updates);
    console.log(`Memory updated successfully for memoryId: ${memoryId}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Memory updated successfully' }),
    };
  } catch (error) {
    // Log error details and return a failure response
    console.error(`Error updating memory with memoryId: ${memoryId}`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to update memory',
        error: error.message,
      }),
    };
  }
};
