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
    // Step 1: Parse the request body and extract the necessary parameters
    const { userId, latitude, longitude, name, art, isPublic = true } = JSON.parse(event.body);

    // Ensure required fields are present
    if (!userId || !latitude || !longitude || !name) {
      console.warn('Missing required memory creation parameters');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required parameters' }),
      };
    }

    console.log(`Creating memory for userId: ${userId} with name: ${name}, at coordinates: (${latitude}, ${longitude})`);

    // Step 2: Retrieve existing memories for the user
    const { ongoing, trips } = await listMemoriesFromDynamoDB(userId);

    // If there is an ongoing memory, add an end date to close it
    if (ongoing) {
      console.log(`Found ongoing memory for userId: ${userId}. Updating with an end date.`);
      await updateMemoryInDynamoDB(ongoing.id, { endDate: new Date().toISOString() });
    }

    // Step 3: Perform reverse geocoding to get the city name based on the latitude and longitude
    const city = await reverseGeocode({ latitude, longitude });
    console.log(`City identified: ${city}`);

    // Step 4: Prepare to create a Spotify playlist
    const createPlaylistEvent = {
      pathParameters: { userId },
      body: JSON.stringify({ playlistName: name, isPublic }),
    };

    // Step 5: Call the createPlaylistHandler to create the Spotify playlist
    const playlistResponse = await createPlaylistHandler(createPlaylistEvent);
    const playlistData = JSON.parse(playlistResponse.body);

    // Check if playlist creation was successful
    if (playlistResponse.statusCode !== 200) {
      console.error(`Failed to create Spotify playlist: ${playlistData.message}`);
      throw new Error(playlistData.message);
    }

    // Extract the playlist ID and other details
    const { playlistId: memoryId, spotifyUrl, createdAt: startDate } = playlistData;
    console.log(`Spotify playlist created with ID: ${memoryId}, public: ${isPublic}, startDate: ${startDate}`);

    // Step 6: Prepare the memory data for storing in DynamoDB
    const memoryData = {
      memoryId,
      userId,
      city,
      name,
      startDate,
      spotifyUrl,
      art: art || null,  // If no art is provided, set it to null
    };

    // Store the memory in DynamoDB
    console.log(`Storing memory data in DynamoDB: ${JSON.stringify(memoryData)}`);
    await storeMemoryInDynamoDB(memoryData);

    // Step 7: Return a successful response with the created memory details
    return {
      statusCode: 201,
      body: JSON.stringify({
        memoryId,
        message: 'Memory created successfully',
        spotifyUrl,
      }),
    };
  } catch (error) {
    // Log any errors encountered during memory creation
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
