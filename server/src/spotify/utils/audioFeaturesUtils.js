import axios from 'axios';

/**
 * Fetch audio features (such as tempo, danceability, and energy) for one or multiple Spotify tracks.
 * 
 * @param {string} accessToken - The Spotify access token required for authentication.
 * @param {string|Array} trackIds - A single track ID or an array of Spotify track IDs.
 * @returns {Array} - Array of formatted audio features for the tracks.
 */
export const getAudioFeatures = async (accessToken, trackIds) => {
  // Step 1: Normalize trackIds to an array if it's a single string
  const trackIdArray = Array.isArray(trackIds) ? trackIds : [trackIds];

  if (trackIdArray.length === 0) {
    console.log('No track IDs provided to fetch audio features.');
    return [];
  }

  try {
    // Step 2: Log the track IDs being used for the request
    console.log('Fetching audio features for track IDs:', trackIdArray);

    // Step 3: Make the API request to fetch audio features
    const response = await axios.get('https://api.spotify.com/v1/audio-features', {
      headers: {
        Authorization: `Bearer ${accessToken}`,  // Pass the access token in the header
      },
      params: {
        ids: trackIdArray.join(','),  // Join the track IDs into a comma-separated string
      },
    });

    // Step 4: Handle and format the audio features
    if (response.data && response.data.audio_features) {
      console.log(`Fetched audio features for ${response.data.audio_features.length} tracks.`);

      // Format the audio features, filtering out null values and extracting relevant info
      const formattedAudioFeatures = response.data.audio_features
        .filter(track => track !== null)  // Exclude null entries
        .map(track => ({
          trackId: track.id,
          tempo: track.tempo,
          danceability: track.danceability,
          energy: track.energy,
          acousticness: track.acousticness,
          valence: track.valence,
        }));

      console.log('Formatted audio features:', formattedAudioFeatures);

      return formattedAudioFeatures;
    } else {
      console.warn('No audio features found in the response.');
      return [];
    }

  } catch (error) {
    // Step 5: Error handling
    console.error('Error fetching audio features:', error.message);
    throw new Error('Failed to fetch audio features from Spotify.');
  }
};
