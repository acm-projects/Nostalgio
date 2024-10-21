import { setPlaylistImageHandler } from '../../spotify/playlists/handlers/setPlaylistImage.js';
import { uploadImage } from '../../s3/s3Service.js';
import { updateMemoryInDynamoDB } from '../memoryService.js';

/**
 * Lambda handler to add an image to a memory by uploading it to S3,
 * setting the playlist image on Spotify, and updating the memory's image URL in DynamoDB.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters, headers, and binary body data.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const addMemoryImageHandler = async (event) => {
  const { userId, memoryId } = event.pathParameters;
  const contentType = event.headers['Content-Type'];
  const originalFileName = event.headers['X-Original-File-Name']; // Retrieve the original file name from headers

  try {
    // Step 1: Validate required parameters
    if (!userId || !memoryId || !event.body || !contentType || !originalFileName) {
      console.warn('Missing required parameters:', {
        userId,
        memoryId,
        imageBodyExists: !!event.body,
        contentType,
        originalFileName,
      });
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'userId, memoryId, image binary data, contentType, and originalFileName are required.',
        }),
      };
    }

    console.log(`Received image for memoryId: ${memoryId}, userId: ${userId}, file: ${originalFileName}`);

    // Step 2: Convert the binary body to a Buffer
    const imageBuffer = Buffer.from(event.body, 'base64');  // Binary image data

    // Step 3: Validate image size (limit to 5MB)
    const maxFileSize = 5 * 1024 * 1024; // 5MB limit
    if (imageBuffer.length > maxFileSize) {
      console.warn(`Image exceeds size limit. Size: ${imageBuffer.length} bytes`);
      return {
        statusCode: 413,
        body: JSON.stringify({ message: 'Image size exceeds the 5MB limit.' }),
      };
    }

    // Step 4: Call setPlaylistImageHandler to set Spotify playlist image
    let setImageResponse;
    try {
      console.log(`Passing image buffer to setPlaylistImageHandler for memoryId: ${memoryId}`);

      const setImageEvent = {
        pathParameters: { userId, memoryId },
        body: JSON.stringify({ imageBuffer, originalFileName }),
      };

      setImageResponse = await setPlaylistImageHandler(setImageEvent);

      if (setImageResponse.statusCode !== 200) {
        console.error(`Failed to set Spotify playlist image for memoryId: ${memoryId}, response: ${setImageResponse.body}`);
        throw new Error(`Failed to set Spotify playlist image: ${setImageResponse.body}`);
      }

      console.log(`Successfully updated Spotify playlist image for memoryId: ${memoryId}`);
    } catch (error) {
      console.error(`Error updating Spotify playlist image for memoryId: ${memoryId} - ${error.message}`);
      // Continue even if Spotify fails, as we want to ensure the next steps are executed
    }

    // Step 5: Upload the image to S3
    let s3ImageUrl;
    try {
      console.log(`Uploading image to S3 for memoryId: ${memoryId}`);
      s3ImageUrl = await uploadImage('playlist', userId, imageBuffer, contentType, memoryId, originalFileName);
      console.log(`Image successfully uploaded to S3. URL: ${s3ImageUrl}`);
    } catch (error) {
      console.error(`Error uploading image to S3 for memoryId: ${memoryId} - ${error.message}`);
      throw new Error(`Failed to upload image to S3: ${error.message}`);
    }

    // Step 6: Update the memory record in DynamoDB with the S3 image URL
    try {
      console.log(`Updating memory record in DynamoDB with image URL for memoryId: ${memoryId}`);
      await updateMemoryInDynamoDB(memoryId, { art: s3ImageUrl });
      console.log(`Memory record updated in DynamoDB with image URL for memoryId: ${memoryId}`);
    } catch (error) {
      console.error(`Error updating DynamoDB record for memoryId: ${memoryId} - ${error.message}`);
      throw new Error(`Failed to update DynamoDB record: ${error.message}`);
    }

    // Return success response
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
