import { updateMemoryInDynamoDB, getMemoryFromDynamoDB } from '../memoryService.js';
import { updateSpotifyPlaylistDetailsHandler } from '../../spotify/playlists/handlers/updateSpotifyPlaylistDetails.js';

/**
 * Lambda handler to update a memory in DynamoDB by memoryId and sync Spotify playlist details if applicable.
 * 
 * @param {Object} event - The API Gateway event containing path parameters and request body.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.userId - The ID of the user associated with the memory.
 * @param {string} event.pathParameters.memoryId - The unique ID of the memory to update.
 * @param {Object} event.body - The request body containing the updates to apply.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const updateMemoryHandler = async (event) => {
  const { userId, memoryId } = event.pathParameters;
  const updates = JSON.parse(event.body);

  // Step 1: Validate the required parameters
  if (!userId || !memoryId || !updates || Object.keys(updates).length === 0) {
    console.warn('User ID, Memory ID, and update data are required to update a memory.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'User ID, Memory ID, and updates are required.' }),
    };
  }

  try {
    // Step 2: Retrieve the memory from DynamoDB to confirm it exists
    console.log(`Retrieving memory with memoryId: ${memoryId} to validate existence.`);
    const memory = await getMemoryFromDynamoDB(memoryId);

    if (!memory) {
      console.warn(`Memory not found in DynamoDB for memoryId: ${memoryId}`);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Memory not found' }),
      };
    }
    console.log(`Memory retrieval successful for memoryId: ${memoryId}. Proceeding with updates.`);

    // Step 3: Update the memory details in DynamoDB
    console.log(`Applying updates to memoryId: ${memoryId} in DynamoDB with data: ${JSON.stringify(updates)}`);
    await updateMemoryInDynamoDB(memoryId, updates);
    console.log(`Memory updated successfully in DynamoDB for memoryId: ${memoryId}`);

    // Step 4: Determine if there are Spotify-specific updates and call Spotify handler if needed
    const { name, description, isCollaborative } = updates;
    if (name || description || typeof isCollaborative !== 'undefined') {
      console.log(`Spotify-related updates detected for memoryId: ${memoryId}. Initiating Spotify sync process.`);
      
      // Pass the entire event object to updateSpotifyPlaylistDetailsHandler
      await updateSpotifyPlaylistDetailsHandler(event);

      console.log(`Spotify playlist details synchronized successfully for memoryId: ${memoryId}`);
    } else {
      console.log(`No Spotify-related updates detected for memoryId: ${memoryId}. Skipping Spotify sync.`);
    }

    // Step 5: Return success response confirming both updates
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Memory and Spotify playlist updated successfully' }),
    };
  } catch (error) {
    // Log any errors encountered during the process
    console.error(`Error encountered while updating memory with memoryId: ${memoryId}`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to update memory and playlist',
        error: error.message,
      }),
    };
  }
};
