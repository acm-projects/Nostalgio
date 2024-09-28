import axios from 'axios';
import { validateSpotifyToken } from '../../spotifyTokenManager.js';  // Ensure token is valid before making the request

/**
 * Fetch recent tracks from Spotify for the authenticated user.
 * 
 * @param {Object} event - The API Gateway Lambda event object.
 * @returns {Object} - The response containing the recent tracks or an error message.
 */
export const getRecentTracks = async (event) => {
  try {
    // Extract the userId from path parameters
    const { userId } = event.pathParameters;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId in path parameters' }),
      };
    }

    // Log for debugging purposes
    console.log(`Fetching recent tracks for user: ${userId}`);

    // Validate the Spotify access token
    const accessToken = await validateSpotifyToken(event);

    if (!accessToken) {
      throw new Error(`Unable to retrieve valid Spotify token for user: ${userId}`);
    }

    // Spotify API request to get recently played tracks
    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 20,  // Limit the number of tracks to fetch (can be customized)
      },
    });

    // Log the response for debugging purposes
    console.log(`Fetched ${response.data.items.length} recent tracks for user: ${userId}`);

    // Return the tracks in the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully fetched recent tracks for user: ${userId}`,
        tracks: response.data.items,  // Returning Spotify API result
      }),
    };

  } catch (error) {
    console.error(`Error fetching recent tracks for user: ${userId} - ${error.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch recent tracks for user: ${userId}`,
        error: error.message,
      }),
    };
  }
};
