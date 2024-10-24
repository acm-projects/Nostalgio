import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';

/**
 * Handler to add a track to a Spotify playlist for a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and body.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const addTrackToPlaylistHandler = async (event) => {
  try {
    // Step 1: Extract userId, playlistId, and trackUri from the request
    const { userId, playlistId } = event.pathParameters;
    const { trackUri } = JSON.parse(event.body);

    // Validate required parameters
    if (!userId || !playlistId || !trackUri) {
      console.warn('Missing userId, playlistId, or trackUri in the request');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId, playlistId, or trackUri' }),
      };
    }

    console.log(`Adding track to playlist for user: ${userId}, playlistId: ${playlistId}, trackUri: ${trackUri}`);

    // Step 2: Retrieve a valid Spotify access token for the user
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }

    // Step 3: Make the API call to Spotify to add a track to the playlist
    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: [trackUri] },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`Track added to playlist successfully for user: ${userId}, playlistId: ${playlistId}`);

    // Step 4: Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Track added to playlist successfully',
        snapshot_id: response.data.snapshot_id,
      }),
    };
  } catch (error) {
    console.error(`Error adding track to playlist for user: ${userId}, playlistId: ${playlistId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to add track to playlist', error: error.message }),
    };
  }
};
