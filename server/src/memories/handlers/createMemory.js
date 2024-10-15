import { reverseGeocode } from '../../locations/handlers/reverseGeocode.js';
import { createPlaylistHandler } from '../../spotify/playlists/handlers/createPlaylist.js';
import { storeMemoryInDynamoDB, updateMemoryInDynamoDB, listMemoriesFromDynamoDB } from '../memoryService.js';

/**
 * Lambda handler to create a memory by generating a Spotify playlist
 * and storing relevant memory details in DynamoDB.
 * 
 * @param {Object} event - API Gateway event object containing the request body.
 * @returns {Object} - HTTP response with memory creation status and details.
 */
export const createMemoryHandler = async (event) => {
  try {
    // Step 1: Extract user input from the request body
    const { userId, latitude, longitude, name, art, isPublic = true } = JSON.parse(event.body);

    if (!userId || !latitude || !longitude || !name) {
      console.warn('Missing required memory creation parameters');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required parameters' }),
      };
    }

    console.log(`Creating memory for userId: ${userId} with name: ${name}, at coordinates: (${latitude}, ${longitude})`);

    // Step 2: Check for ongoing memory and add an end date if necessary
    const existingMemories = await listMemoriesFromDynamoDB(userId);
    const ongoingMemory = existingMemories.find(memory => !memory.endDate);

    if (ongoingMemory) {
      console.log(`Found ongoing memory for userId: ${userId}. Updating with an end date.`);
      await updateMemoryInDynamoDB(ongoingMemory.memoryId, { endDate: new Date().toISOString() });
    }

    // Step 3: Perform reverse geocoding to get the city name from coordinates
    const city = await reverseGeocode({ latitude, longitude });
    console.log(`City identified: ${city}`);

    // Step 4: Construct an event for createPlaylistHandler with required parameters
    const createPlaylistEvent = {
      pathParameters: { userId },
      body: JSON.stringify({ playlistName: name, isPublic }),
    };

    // Step 5: Invoke createPlaylistHandler as if it's receiving a direct API request
    const playlistResponse = await createPlaylistHandler(createPlaylistEvent);
    const playlistData = JSON.parse(playlistResponse.body);

    if (playlistResponse.statusCode !== 200) {
      throw new Error(`Failed to create Spotify playlist: ${playlistData.message}`);
    }

    const { playlistId: memoryId, spotifyUrl, createdAt: startDate } = playlistData;
    console.log(`Spotify playlist created with ID: ${memoryId}, public: ${isPublic}, startDate: ${startDate}`);

    // Step 6: Prepare memory data for DynamoDB storage
    const memoryData = {
      memoryId,
      userId,
      city,
      name,
      startDate,
      spotifyUrl,
      art: art || null,
    };

    console.log(`Storing memory data in DynamoDB: ${JSON.stringify(memoryData)}`);
    await storeMemoryInDynamoDB(memoryData);

    // Step 7: Return success response with memory and Spotify details
    return {
      statusCode: 201,
      body: JSON.stringify({
        memoryId,
        message: 'Memory created successfully',
        spotifyUrl,
      }),
    };
  } catch (error) {
    console.error(`Error creating memory: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to create memory',
        error: error.message,
      }),
    };
  }
};
