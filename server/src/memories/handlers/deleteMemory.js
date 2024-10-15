import { deleteMemoryFromDynamoDB } from '../memoryService.js';
import { deletePlaylistHandler } from '../../spotify/playlists/handlers/deletePlaylist.js';

/**
 * Lambda handler to delete a memory from DynamoDB and its associated Spotify playlist.
 * 
 * @param {Object} event - The API Gateway event containing path parameters.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.userId - The unique ID of the user.
 * @param {string} event.pathParameters.memoryId - The unique ID of the memory to be deleted.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const deleteMemoryHandler = async (event) => {
  const { userId, memoryId } = event.pathParameters;

  if (!userId || !memoryId) {
    console.warn('User ID and Memory ID are required to delete a memory.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'User ID and Memory ID are required.' }),
    };
  }

  try {
    // Step 1: Attempt to delete the Spotify playlist associated with the memory
    console.log(`Attempting to delete Spotify playlist with ID: ${memoryId} for user: ${userId}`);
    const deletePlaylistEvent = {
      pathParameters: { userId, playlistId: memoryId },
    };
    const playlistResponse = await deletePlaylistHandler(deletePlaylistEvent);

    if (playlistResponse.statusCode !== 200) {
      console.warn(`Failed to delete Spotify playlist for memoryId: ${memoryId}. Proceeding with memory deletion.`);
    }

    // Step 2: Attempt to delete the memory from DynamoDB
    console.log(`Attempting to delete memory with memoryId: ${memoryId} from DynamoDB`);
    await deleteMemoryFromDynamoDB(memoryId);
    console.log(`Memory and associated Spotify playlist deleted successfully for memoryId: ${memoryId}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Memory and associated Spotify playlist deleted successfully' }),
    };
  } catch (error) {
    // Log error details for troubleshooting
    console.error(`Error deleting memory with memoryId: ${memoryId}`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to delete memory or associated playlist',
        error: error.message,
      }),
    };
  }
};
