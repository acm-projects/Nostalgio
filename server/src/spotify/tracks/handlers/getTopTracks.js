import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';  // Ensure token is valid before making the request

/**
 * Fetch the top tracks from Spotify for the authenticated user.
 * 
 * @param {Object} event - The API Gateway Lambda event object.
 * @returns {Object} - The response containing the top tracks or an error message.
 */
export const getTopTracks = async (event) => {
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
    console.log(`Fetching top tracks for user: ${userId}`);

    // Validate the Spotify access token
    const tokenValidationResponse = await validateSpotifyToken(event);

    if (!tokenValidationResponse || !tokenValidationResponse.body) {
      throw new Error(`Unable to retrieve valid Spotify token for user: ${userId}`);
    }

    // Parse the access token from the response body
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`Access token missing for user: ${userId}`);
    }

    // Log access token for debugging
    console.log(`Using access token for user: ${userId}`);

    // Spotify API request to get user's top tracks
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 10,  // Limit the number of tracks to 10
        time_range: 'medium_term',  // Can be 'short_term', 'medium_term', 'long_term'
      },
    });

    // Format the response to return only essential data
    const formattedTracks = response.data.items.map(track => ({
      name: track.name,
      popularity: track.popularity,  // Include the popularity of the track
      artists: track.artists.map(artist => artist.name).join(', '),  // Comma-separated artist names
      album: {
        name: track.album.name,
        release_date: track.album.release_date,
        images: track.album.images,  // Include album images in different resolutions
      },
      track_url: track.external_urls.spotify  // Link to the track on Spotify
    }));

    // Log the formatted response for debugging purposes
    console.log(`Fetched ${formattedTracks.length} top tracks for user: ${userId}`);

    // Return the top tracks in the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully fetched top tracks for user: ${userId}`,
        tracks: formattedTracks,  // Return formatted tracks
      }),
    };

  } catch (error) {
    console.error(`Error fetching top tracks for user: ${userId} - ${error.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch top tracks for user: ${userId}`,
        error: error.message,
      }),
    };
  }
};
