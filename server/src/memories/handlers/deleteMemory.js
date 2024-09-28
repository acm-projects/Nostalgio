import { deleteMemoryFromDynamoDB } from '../memoryService.js';

export const deleteMemoryHandler = async (event) => {
  const { userId, memoryId } = event.pathParameters;

  try {
    await deleteMemoryFromDynamoDB(userId, memoryId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Memory deleted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete memory', error: error.message }),
    };
  }
};
