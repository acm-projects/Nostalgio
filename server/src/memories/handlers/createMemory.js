import { storeMemoryInDynamoDB } from '../memoryService.js';

export const createMemoryHandler = async (event) => {
  const { userId, memoryId, location, timestamp, songs } = JSON.parse(event.body);

  try {
    await storeMemoryInDynamoDB({
      UserId: userId,
      MemoryId: memoryId,
      Location: location,
      Timestamp: timestamp,
      Songs: songs,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Memory created successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create memory', error: error.message }),
    };
  }
};
