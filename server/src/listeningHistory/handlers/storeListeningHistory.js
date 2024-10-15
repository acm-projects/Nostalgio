import { storeListeningHistory } from '../listeningHistoryService.js';

/**
 * Lambda handler to store a user's track with location data.
 * Expects lat, lon, userId, and nested data under trackInfo and audioFeatures in the event body.
 */
export const handler = async (event) => {
  try {
    // Parse and destructure the response body
    const { lat, lon, userId, data: { trackInfo, audioFeatures } } = JSON.parse(event.body);

    // Input validation to ensure required fields are present
    if (!lat || !lon || !userId || !trackInfo || !audioFeatures) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields: lat, lon, userId, trackInfo, or audioFeatures' })
      };
    }

    console.log(`Storing track for user: ${userId}, track: ${trackInfo.id}, at lat: ${lat}, lon: ${lon}`);

    // Prepare listening data for storage, matching the required schema
    const listeningData = {
      userId,
      trackId: trackInfo.id,
      artistIds: trackInfo.artists.map(artist => artist.id),  // Extract artist IDs from the artist list
      lat,
      lon,
      genres: trackInfo.genres,
      audioFeatures: {
        tempo: Number(audioFeatures.tempo),
        danceability: Number(audioFeatures.danceability),
        energy: Number(audioFeatures.energy),
        acousticness: Number(audioFeatures.acousticness),
        valence: Number(audioFeatures.valence),
      },
      track_url: trackInfo.track_url,
      album: {
        name: trackInfo.album.name,
        release_date: trackInfo.album.release_date,
        images: trackInfo.album.images, // Pass album images directly
      }
    };

    // Store the track with location data
    await storeListeningHistory(listeningData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully stored track with location' })
    };
  } catch (error) {
    console.error(`Error storing track with location: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to store track with location' })
    };
  }
};
