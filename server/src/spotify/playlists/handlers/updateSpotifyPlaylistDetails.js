import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';

/**
 * Handler to update Spotify playlist details for a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and request body.
 * @returns {Object} - HTTP response with a success or failure message.
 */
export const updateSpotifyPlaylistDetailsHandler = async (event) => {
  let userId, memoryId;

  try {
    // Step 1: Extract userId and memoryId from path parameters, using memoryId as playlistId
    ({ userId, memoryId } = event.pathParameters);

    // Validate presence of userId and memoryId
    if (!userId || !memoryId) {
      console.warn('Missing userId or memoryId in the request');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Both userId and memoryId (as playlistId) are required' }),
      };
    }

    console.log(`Starting Spotify playlist update for userId: ${userId}, memoryId (as playlistId): ${memoryId}`);

    // Step 2: Validate and retrieve a Spotify access token
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }

    // Step 3: Extract and validate the playlist details from request body
    const { name, description, isPublic, isCollaborative } = JSON.parse(event.body);

    // Ensure at least one update field is provided
    if (!name && !description && isPublic === undefined && isCollaborative === undefined) {
      console.warn('No valid fields provided for update');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'At least one field (name, description, isPublic, or isCollaborative) is required' }),
      };
    }

    console.log(`Preparing Spotify update payload for memoryId (playlistId): ${memoryId}`);

    // Step 4: Build the update payload
    const updatePayload = {};
    if (name) updatePayload.name = name;
    if (description) updatePayload.description = description;
    if (isPublic !== undefined) updatePayload.public = isPublic;
    if (isCollaborative !== undefined) updatePayload.collaborative = isCollaborative;

    // Step 5: Make the API call to update playlist details on Spotify
    try {
      console.log(`Sending update to Spotify API for playlistId: ${memoryId} with data: ${JSON.stringify(updatePayload)}`);
      await axios.put(
        `https://api.spotify.com/v1/playlists/${memoryId}`, // Using memoryId as playlistId
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(`Spotify playlist updated successfully for playlistId: ${memoryId}`);

      // Return success response with updated fields
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Playlist updated successfully',
          playlistId: memoryId,
          updatedFields: updatePayload,
        }),
      };
    } catch (error) {
      console.error(`Error updating Spotify playlist ${memoryId}: ${error.message}`);
      throw new Error('Failed to update Spotify playlist');
    }
  } catch (error) {
    console.error(`Error processing playlist update for userId: ${userId}, memoryId (playlistId): ${memoryId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update playlist details', error: error.message }),
    };
  }
};
