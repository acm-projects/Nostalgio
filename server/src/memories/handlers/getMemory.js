import { getMemoryFromDynamoDB } from '../memoryService.js';

export const getMemoryHandler = async (event) => {
  const { userId, memoryId } = event.pathParameters;

  try {
    const memory = await getMemoryFromDynamoDB(userId, memoryId);
    if (!memory) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Memory not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(memory),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to get memory', error: error.message }),
    };
  }
};
