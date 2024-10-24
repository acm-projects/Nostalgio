import { suggestSongsByLocation } from '../musicSuggestionsService.js';

/**
 * Lambda handler to suggest songs based on location and user listening patterns.
 * Expects userId in the path parameters and lat, lon, and optional radius as query parameters.
 */
export const handler = async (event) => {
  try {
    // Extract userId from the path parameters
    const { userId } = event.pathParameters;

    // Extract lat, lon, and radius from the query string parameters
    const { lat, lon, radius } = event.queryStringParameters || {};

    // Input validation: check if userId and location (lat/lon) are present
    if (!userId || !lat || !lon) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields: userId or location (lat/lon)' })
      };
    }

    console.log(`Starting song suggestion for user: ${userId}, at location (${lat}, ${lon}), radius: ${radius || 'city-level precision'}`);

    // Create location object from query string parameters
    const location = { lat: parseFloat(lat), lon: parseFloat(lon) };

    // Call the service to generate song suggestions
    const recommendations = await suggestSongsByLocation(userId, location, radius);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully generated song suggestions',
        recommendations
      })
    };
  } catch (error) {
    console.error(`Error generating song suggestions: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to generate song suggestions' })
    };
  }
};
