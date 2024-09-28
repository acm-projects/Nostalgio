import { updateMemoryInDynamoDB } from '../memoryService.js';

export const updateMemoryHandler = async (event) => {
  const { userId, memoryId } = event.pathParameters;
  const updates = JSON.parse(event.body);

  try {
    await updateMemoryInDynamoDB(userId, memoryId, updates);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Memory updated successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update memory', error: error.message }),
    };
  }
};
