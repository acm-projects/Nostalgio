import { listMemoriesFromDynamoDB } from '../memoryService.js';

export const listMemoriesHandler = async (event) => {
  const { userId } = event.pathParameters;

  try {
    const memories = await listMemoriesFromDynamoDB(userId);

    return {
      statusCode: 200,
      body: JSON.stringify(memories),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to list memories', error: error.message }),
    };
  }
};
