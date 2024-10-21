import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';
import { uploadImageToCloudinary, fetchImageAsBase64 } from '../../../s3/cloudinaryService.js';

/**
 * Handler to update a Spotify playlist cover image for a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and body.
 * @returns {Object} - HTTP response indicating success or failure of the image update.
 */
export const setPlaylistImageHandler = async (event) => {
  try {
    console.log('Received event:', JSON.stringify(event));  // Log the entire event for debugging

    // Step 1: Extract userId and memoryId from path parameters and image data from body
    const { userId, memoryId } = event.pathParameters;  // Use memoryId instead of playlistId
    const { imageBuffer, originalFileName } = JSON.parse(event.body);  // Binary image buffer and original file name

    console.log(`Extracted userId: ${userId}, memoryId: ${memoryId}, originalFileName: ${originalFileName}`);

    // Step 2: Validate required parameters
    if (!userId || !memoryId || !imageBuffer || !originalFileName) {
      console.warn('Missing required parameters:', { userId, memoryId, imageBufferExists: !!imageBuffer, originalFileName });
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'userId, memoryId, imageBuffer, and original file name are required.' }),
      };
    }

    console.log(`Proceeding with playlist image update for memoryId: ${memoryId}, userId: ${userId}`);

    // Step 3: Validate the Spotify access token
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);
    console.log(`Spotify token validation response: ${tokenValidationResponse.body}`);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }
    console.log(`Validated Spotify access token for user: ${userId}`);

    // Step 4: Upload the image buffer to Cloudinary with downsizing logic
    console.log('Uploading the image buffer to Cloudinary...');
    const cloudinaryUrl = await uploadImageToCloudinary(Buffer.from(imageBuffer, 'base64'), originalFileName); // Convert to Buffer
    console.log(`Image uploaded to Cloudinary. URL: ${cloudinaryUrl}`);

    // Step 5: Fetch the image from Cloudinary as Base64 for Spotify
    console.log('Fetching image as Base64 from Cloudinary...');
    const base64Image = await fetchImageAsBase64(cloudinaryUrl);

    if (!base64Image) {
      console.error('Failed to fetch or convert image to Base64 from Cloudinary.');
      throw new Error('Base64 image is undefined or empty.');
    }

    console.log(`Base64 image fetched from Cloudinary. Length of base64 string: ${base64Image.length}`);
    console.log(`Base64 image preview (first 100 chars): ${base64Image.substring(0, 100)}...`);

    // Step 6: Send PUT request to Spotify API to update playlist image
    console.log(`Sending PUT request to Spotify API to update playlist image for memoryId: ${memoryId}`);
    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${memoryId}/images`,  // Use memoryId in API call
      base64Image,  // Send the Base64 JPEG image data
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'image/jpeg',  // Spotify requires JPEG format
        },
      }
    );

    console.log(`Spotify API response status: ${response.status}`);

    if (response.status !== 200) {
      throw new Error(`Spotify API returned status code ${response.status}`);
    }

    console.log(`Successfully updated playlist image for memoryId: ${memoryId}, Spotify response status: ${response.status}`);

    // Step 7: Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Playlist image updated successfully',
        memoryId,  // Use memoryId in the response
      }),
    };

  } catch (error) {
    console.error(`Error updating playlist image for memoryId: ${memoryId || 'unknown'} - ${error.message}`);
    if (error.response) {
      console.error(`Spotify API Error: ${error.response.data.error.message}`);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update playlist image', error: error.message }),
    };
  }
};
