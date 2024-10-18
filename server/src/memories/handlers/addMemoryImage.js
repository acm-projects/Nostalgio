import { setPlaylistImageHandler } from '../../spotify/playlists/handlers/setPlaylistImage.js';
import { uploadImage } from '../../s3/s3Service.js';
import { updateMemoryInDynamoDB } from '../memoryService.js';

/**
 * Lambda handler to add an image to a memory by updating both the DynamoDB record and Spotify playlist image.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and body data.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const addMemoryImageHandler = async (event) => {
  const { userId, memoryId } = event.pathParameters;
  const contentType = event.headers['Content-Type'];
  const originalFileName = event.headers['X-Original-File-Name']; // Retrieve the original file name from headers

  try {
    // Step 1: Validate required parameters
    const { imageBase64 } = JSON.parse(event.body);
    if (!userId || !memoryId || !imageBase64 || !contentType || !originalFileName) {
      console.warn('Missing required parameters: userId, memoryId, image data, contentType, or original file name.');
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'userId, memoryId, imageBase64, contentType, and originalFileName are required.',
        }),
      };
    }

    console.log(`Received image for memory with memoryId: ${memoryId}, userId: ${userId}, file: ${originalFileName}`);

    // Step 2: Convert the base64 string to a Buffer
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    
    // Step 3: Validate image size (limit to 5MB)
    const maxFileSize = 5 * 1024 * 1024; // 5MB limit
    if (imageBuffer.length > maxFileSize) {
      console.warn(`Image exceeds size limit. Size: ${imageBuffer.length} bytes`);
      return {
        statusCode: 413,
        body: JSON.stringify({ message: 'Image size exceeds the 5MB limit.' }),
      };
    }

    // Step 4: Upload image to S3 using the original file name
    const s3ImageUrl = await uploadImage('playlist', userId, imageBuffer, contentType, memoryId, originalFileName);
    console.log(`Image successfully uploaded to S3. URL: ${s3ImageUrl}`);

    // Step 5: Set the playlist image on Spotify using the base64 image data
    const setImageEvent = {
      pathParameters: { userId, playlistId: memoryId },
      body: JSON.stringify({ image: imageBase64 }),
    };

    const setImageResponse = await setPlaylistImageHandler(setImageEvent);

    if (setImageResponse.statusCode !== 200) {
      throw new Error(`Failed to set Spotify playlist image: ${setImageResponse.body}`);
    }

    console.log(`Successfully updated Spotify playlist image for memoryId: ${memoryId}`);

    // Step 6: Update the memory record in DynamoDB with the S3 image URL
    await updateMemoryInDynamoDB(memoryId, { art: s3ImageUrl });
    console.log(`Memory record updated in DynamoDB with image URL for memoryId: ${memoryId}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Memory image added successfully',
        memoryId,
        imageUrl: s3ImageUrl,
      }),
    };
  } catch (error) {
    console.error(`Error adding image to memory with memoryId: ${memoryId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to add image to memory',
        error: error.message,
      }),
    };
  }
};
