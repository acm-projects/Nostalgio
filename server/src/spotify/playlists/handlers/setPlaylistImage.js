import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';
import { convertToJpeg } from '../../../s3/s3Service.js'; // Importing the convertToJpeg function

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
    const { image, contentType } = JSON.parse(event.body);

    if (!userId || !playlistId || !image || !contentType) {
      console.warn('Missing required parameters: userId, playlistId, image data, or content type');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'userId, playlistId, image data, and content type are required' }),
      };
    }

    console.log(`Updating cover image for playlistId: ${playlistId} for userId: ${userId}`);

    // Step 2: Validate the Spotify access token
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }

    // Step 3: Convert the image to JPEG if necessary
    const jpegImageBuffer = await convertToJpeg(Buffer.from(image, 'base64'), contentType);
    const base64Image = jpegImageBuffer.toString('base64');

    // Step 4: Send the PUT request to update the playlist image on Spotify
    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${playlistId}/images`,
      base64Image, // Send raw Base64 JPEG data
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'image/jpeg', // Spotify requires JPEG
        },
      }
    );

    console.log(`Successfully updated playlist image for playlistId: ${playlistId}`);
    console.log(`Spotify response status: ${response.status}`);

    // Step 5: Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Playlist image updated successfully',
        playlistId,
      }),
    };
  } catch (error) {
    console.error(`Error updating playlist image for playlistId: ${playlistId} - ${error.message}`);
    if (error.response) {
      console.error(`Spotify API Error: ${error.response.data.error.message}`);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update playlist image', error: error.message }),
    };
  }
};
