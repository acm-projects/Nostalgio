import { getCityMemoriesFromDynamoDB } from '../memoryService.js';

/**
 * Lambda handler to retrieve all memories for a user in a specific city.
 * 
 * @param {Object} event - The API Gateway event containing path parameters.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.userId - The user ID for which to retrieve memories.
 * @param {string} event.pathParameters.city - The city for which to retrieve memories.
 * @returns {Object} - HTTP response with categorized ongoing and past trips or an error message.
 */
export const getCityMemoriesHandler = async (event) => {
  const { userId, city } = event.pathParameters;

  // Validate that both userId and city are provided
  if (!userId || !city) {
    console.warn('User ID and city are required to retrieve city memories.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'User ID and city are required.' }),
    };
  }

  try {
    // Retrieve all memories for the specified user and city from DynamoDB
    console.log(`Retrieving memories for userId: ${userId} in city: ${city}`);
    const memories = await getCityMemoriesFromDynamoDB(userId, city);

    // Check if any memories are found and log the categorized response
    if (memories.ongoing || memories.trips.length > 0) {
      console.log(`Memories retrieved for userId: ${userId} in city: ${city} with ${memories.trips.length} trips.`);
    } else {
      console.log(`No memories found for userId: ${userId} in city: ${city}.`);
    }

    // Return the categorized memories as ongoing and trips
    return {
      statusCode: 200,
      body: JSON.stringify(memories),
    };
  } catch (error) {
    // Log the error details and return a failure response
    console.error(`Error retrieving memories for userId: ${userId} in city: ${city}`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to retrieve city memories',
        error: error.message,
      }),
    };
  }
};
