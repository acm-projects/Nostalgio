import { getListeningHistoryByLocation } from '../listeningHistoryService.js';

/**
 * Lambda handler to get tracks near a location.
 * Expects lat and lon in path parameters, and radius as an optional query parameter.
 */
export const handler = async (event) => {
  try {
    const { lat, lon } = event.pathParameters;  // Required path parameters
    const radius = event.queryStringParameters?.radius || null;  // Optional query parameter, default to null for city-level precision

    // Input validation for required path parameters
    if (!lat || !lon) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing latitude or longitude' })
      };
    }

    console.log(`Querying tracks near lat: ${lat}, lon: ${lon}, radius: ${radius ? radius + ' meters' : 'city-level precision'}`);

    // Fetch listening history near the specified location
    const nearbyTracks = await getListeningHistoryByLocation(parseFloat(lat), parseFloat(lon), radius);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully fetched tracks near the location',
        tracks: nearbyTracks
      })
    };
  } catch (error) {
    console.error(`Error fetching tracks by location: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch tracks by location' })
    };
  }
};
