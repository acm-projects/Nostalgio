import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';  // Ensure token is valid before making the request
import { getAudioFeatures } from '../../utils/audioFeaturesUtils.js';  // For fetching audio features

/**
 * Fetch the user's recently played tracks from Spotify, including audio features.
 * 
 * @param {Object} event - The API Gateway Lambda event object.
 * @returns {Object} - The response containing the recently played tracks or an error message.
 */
export const getRecentTracksHandler = async (event) => {
  let userId;  // Declare userId to use in error handling

  try {
    // Step 1: Extract the userId from path parameters
    userId = event.pathParameters?.userId;

    if (!userId) {
      console.warn('Missing userId in path parameters.');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId in path parameters' }),
      };
    }

    console.log(`Fetching recent tracks for user: ${userId}`);

    // Step 2: Validate the Spotify access token
    const tokenValidationResponse = await validateSpotifyToken(event);

    if (!tokenValidationResponse || !tokenValidationResponse.body) {
      throw new Error(`Unable to retrieve valid Spotify token for user: ${userId}`);
    }

    // Step 3: Parse the access token from the response body
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`Access token missing for user: ${userId}`);
    }

    console.log(`Using access token for user: ${userId}`);

    // Step 4: Spotify API request to get user's recently played tracks
    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        Authorization: `Bearer ${accessToken}`,  // Pass the validated access token
      },
      params: {
        limit: 10,  // Limit the number of tracks to 10
      },
    });

    if (!response.data || !response.data.items) {
      throw new Error('Invalid data returned from Spotify API.');
    }

    // Step 5: Extract track IDs for audio features lookup
    const trackIds = response.data.items.map(item => item.track.id);
    console.log(`Fetched recent track IDs: ${trackIds}`);

    // Step 6: Fetch audio features for the tracks
    const audioFeatures = await getAudioFeatures(accessToken, trackIds);

    // Step 7: Format the response to include essential track data and audio features with default values
    const formattedTracks = response.data.items.map((item, index) => ({
      trackId: item.track.id,  // Include the trackId in the response
      played_at: item.played_at,  // Timestamp of when the track was played
      name: item.track.name,
      popularity: item.track.popularity,
      duration_ms: item.track.duration_ms,
      explicit: item.track.explicit,
      preview_url: item.track.preview_url,
      artists: item.track.artists.map(artist => ({
        name: artist.name,
        id: artist.id,  // Include artist ID here
      })),
      album: {
        name: item.track.album.name,
        release_date: item.track.album.release_date,
        total_tracks: item.track.album.total_tracks,
        images: item.track.album.images,
      },
      track_url: item.track.external_urls.spotify,
      uri: item.track.uri,
      audio_features: {
        tempo: audioFeatures[index]?.tempo || 0,  // Default to 0 if undefined
        danceability: audioFeatures[index]?.danceability || 0,  // Default to 0 if undefined
        energy: audioFeatures[index]?.energy || 0,  // Default to 0 if undefined
        acousticness: audioFeatures[index]?.acousticness || 0,  // Default to 0 if undefined
        valence: audioFeatures[index]?.valence || 0,  // Default to 0 if undefined
      },
    }));

    // Step 8: Log the formatted response for debugging purposes
    console.log(`Fetched and formatted ${formattedTracks.length} recent tracks for user: ${userId}`);

    // Step 9: Return the recent tracks with audio features in the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully fetched recent tracks for user: ${userId}`,
        tracks: formattedTracks,  // Return formatted recent tracks with audio features
      }),
    };

  } catch (error) {
    // Step 10: Error handling
    console.error(`Error fetching recent tracks for user: ${userId || 'unknown'} - ${error.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch recent tracks for user: ${userId || 'unknown'}`,
        error: error.message,
      }),
    };
  }
};
