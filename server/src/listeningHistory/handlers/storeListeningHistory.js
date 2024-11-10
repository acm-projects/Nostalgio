import { storeListeningHistory } from '../listeningHistoryService.js';

/**
 * Lambda handler to store a user's listening history with track and location data.
 * Expects lat, lon, userId, and nested data under trackInfo and audioFeatures in the event body.
 * 
 * @param {Object} event - The API Gateway event containing body with lat, lon, userId, trackInfo, and audioFeatures.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const handler = async (event) => {
  try {
    // Parse and destructure the incoming request body
    const { lat, lon, userId, data: { trackInfo, audioFeatures } } = JSON.parse(event.body);

    // Validate that all required fields are present
    if (!lat || !lon || !userId || !trackInfo || !audioFeatures) {
      console.warn('Missing one or more required fields: lat, lon, userId, trackInfo, or audioFeatures');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields: lat, lon, userId, trackInfo, or audioFeatures' })
      };
    }

    console.log(`Storing listening history for user: ${userId}, trackId: ${trackInfo.id}, location: [${lat}, ${lon}]`);

    // Build listening data object with expanded details for storage
    const listeningData = {
      userId,
      trackId: trackInfo.id,
      trackUri: trackInfo.uri,  // Track URI for Spotify playback
      artistIds: trackInfo.artists.map(artist => artist.id),  // Array of artist IDs
      artistNames: trackInfo.artists.map(artist => artist.name),  // Array of artist names
      lat,
      lon,
      genres: trackInfo.genres || [],  // Fallback to empty array if genres are not provided
      audioFeatures: {
        tempo: Number(audioFeatures.tempo),
        danceability: Number(audioFeatures.danceability),
        energy: Number(audioFeatures.energy),
        acousticness: Number(audioFeatures.acousticness),
        valence: Number(audioFeatures.valence),
      },
      trackUrl: trackInfo.external_urls?.spotify,  // Spotify URL for the track
      album: {
        name: trackInfo.album.name,
        releaseDate: trackInfo.album.release_date,
        images: {
          small: trackInfo.album.images[2] || null,   // Small (64x64)
          medium: trackInfo.album.images[1] || null,  // Medium (300x300)
          large: trackInfo.album.images[0] || null,   // Large (640x640)
        },
      }
    };

    console.log(`Prepared listening data for storage: ${JSON.stringify(listeningData)}`);

    // Call storage function to save the listening history
    await storeListeningHistory(listeningData);

    console.log('Listening history successfully stored in the database');

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully stored listening history with location and track details' })
    };
  } catch (error) {
    console.error(`Error storing listening history for user ${userId}: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to store listening history', error: error.message })
    };
  }
};
