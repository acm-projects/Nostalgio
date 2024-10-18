import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';

/**
 * Handler to update a Spotify playlist cover image for a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and body.
 * @returns {Object} - HTTP response indicating success or failure of the image update.
 */
export const setPlaylistImageHandler = async (event) => {
  try {
    // Step 1: Extract userId, playlistId, and image data from the request
    const { userId, playlistId } = event.pathParameters;
    const { image } = JSON.parse(event.body);

    if (!userId || !playlistId || !image) {
      console.warn('Missing required parameters: userId, playlistId, or image data');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'userId, playlistId, and image data are required' }),
      };
    }

    console.log(`Updating cover image for playlistId: ${playlistId} for userId: ${userId}`);

    // Step 2: Validate the Spotify access token
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }

    // Step 3: Send the PUT request to update the playlist image on Spotify
    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistId}/images`,
      image, // Base64 encoded image data as the body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'image/jpeg',
        },
      }
    );

    console.log(`Successfully updated playlist image for playlistId: ${playlistId}`);

    // Step 4: Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Playlist image updated successfully',
        playlistId,
      }),
    };
  } catch (error) {
    console.error(`Error updating playlist image for playlistId: ${playlistId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update playlist image', error: error.message }),
    };
  }
};
