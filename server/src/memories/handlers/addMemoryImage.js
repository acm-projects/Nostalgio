// src/memories/handlers/addMemoryImageHandler.js

import { setPlaylistImageHandler } from '../../spotify/playlists/handlers/setPlaylistImage.js';
import { updateMemoryInDynamoDB } from '../memoryService.js';
import { readFileSync } from 'fs';

/**
 * Lambda handler to add an image to a memory by updating both the DynamoDB record and Spotify playlist image.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and image file.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const addMemoryImageHandler = async (event) => {
  try {
    // Step 1: Extract userId, memoryId, and image data from path parameters and body
    const { userId, memoryId } = event.pathParameters;
    const { imageFilePath } = JSON.parse(event.body); // Path to image file

    if (!userId || !memoryId || !imageFilePath) {
      console.warn('Missing required parameters: userId, memoryId, or image file path');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'userId, memoryId, and image file path are required' }),
      };
    }

    console.log(`Adding image to memory with memoryId: ${memoryId} for userId: ${userId}`);

    // Step 2: Read and encode the image file in base64
    const imageBuffer = readFileSync(imageFilePath);
    const imageBase64 = imageBuffer.toString('base64');
    const base64ImageData = `data:image/jpeg;base64,${imageBase64}`;

    // Step 3: Use setPlaylistImageHandler to update the Spotify playlist cover image
    const setImageEvent = {
      pathParameters: { userId, playlistId: memoryId },
      body: JSON.stringify({ image: base64ImageData }),
    };

    const setImageResponse = await setPlaylistImageHandler(setImageEvent);

    if (setImageResponse.statusCode !== 200) {
      throw new Error(`Failed to set Spotify playlist image: ${setImageResponse.body}`);
    }

    console.log(`Successfully updated Spotify playlist image for memoryId: ${memoryId}`);

    // Step 4: Update the memory record in DynamoDB to include the image URL
    const imageUrl = `https://open.spotify.com/playlist/${memoryId}/image.jpg`; // Example URL construction
    await updateMemoryInDynamoDB(memoryId, { art: imageUrl });

    console.log(`Memory image updated in DynamoDB with memoryId: ${memoryId}`);

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Memory image added successfully',
        memoryId,
        imageUrl,
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
