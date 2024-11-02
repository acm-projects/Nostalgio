import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';

/**
 * Handler to delete a Spotify playlist for a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters.
 * @returns {Object} - HTTP response with the deletion status or an error message.
 */
export const deletePlaylistHandler = async (event) => {
  try {
    // Step 1: Extract userId and playlistId from the path parameters
    const { userId, playlistId } = event.pathParameters;

    // Validate required parameters
    if (!userId || !playlistId) {
      console.warn('Missing userId or playlistId in the request');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId or playlistId' }),
      };
    }

    console.log(`Attempting to delete playlist: ${playlistId} for user: ${userId}`);

    // Step 2: Retrieve a valid Spotify access token
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }

    // Step 3: Make the API call to Spotify to delete the playlist
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(`Successfully deleted Spotify playlist with ID: ${playlistId} for user: ${userId}`);

    // Step 4: Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Playlist deleted successfully',
        playlistId,
      }),
    };
  } catch (error) {
    console.error(`Error deleting playlist for user: ${userId}, playlistId: ${playlistId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete playlist', error: error.message }),
    };
  }
};
