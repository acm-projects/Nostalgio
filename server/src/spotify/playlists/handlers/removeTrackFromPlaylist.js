import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';

/**
 * Handler to remove a track from a Spotify playlist for a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and body.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const removeTrackFromPlaylistHandler = async (event) => {
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

    console.log(`Removing track from playlist for user: ${userId}, playlistId: ${playlistId}, trackUri: ${trackUri}`);

    // Step 2: Retrieve a valid Spotify access token for the user
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }

    // Step 3: Make the API call to Spotify to remove the track from the playlist
    const response = await axios.delete(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: {
          tracks: [{ uri: trackUri }],
        },
      }
    );

    console.log(`Track removed from playlist successfully for user: ${userId}, playlistId: ${playlistId}`);

    // Step 4: Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Track removed from playlist successfully',
        snapshot_id: response.data.snapshot_id,
      }),
    };
  } catch (error) {
    console.error(`Error removing track from playlist for user: ${userId}, playlistId: ${playlistId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to remove track from playlist', error: error.message }),
    };
  }
};
