import axios from 'axios';
import { getTrackInfo } from '../../utils/trackUtils.js';  // Adjusted path for trackUtils
import { getAudioFeatures } from '../../utils/audioFeaturesUtils.js';  // Adjusted path for audioFeaturesUtils
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';  // Adjusted path for Spotify token validation

/**
 * Fetch the currently playing track for a user, including track info and audio features.
 * 
 * @param {Object} event - The API Gateway Lambda event object.
 * @returns {Object} - The response containing currently playing track info and audio features.
 */
export const getCurrentlyPlayingTrackHandler = async (event) => {
  try {
    // Step 1: Extract the userId from the event
    const { userId } = event.pathParameters;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId in path parameters' }),
      };
    }

    console.log(`Fetching currently playing track for user: ${userId}`);

    // Step 2: Validate the Spotify access token
    const tokenValidationResponse = await validateSpotifyToken(event);

    if (!tokenValidationResponse || !tokenValidationResponse.body) {
      throw new Error(`Unable to retrieve valid Spotify token for user: ${userId}`);
    }

    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`Access token missing for user: ${userId}`);
    }

    // Step 3: Make Spotify API request to get currently playing track
    const currentlyPlayingResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const currentlyPlaying = currentlyPlayingResponse.data;

    if (!currentlyPlaying || !currentlyPlaying.item) {
      return {
        statusCode: 204,  // No content if no track is currently playing
        body: JSON.stringify({ message: 'No track is currently playing.' }),
      };
    }

    const trackId = currentlyPlaying.item.id;
    console.log(`Currently playing track ID: ${trackId}`);

    // Step 4: Fetch detailed track info
    const trackInfo = await getTrackInfo(userId, trackId);

    if (!trackInfo.success) {
      throw new Error(trackInfo.message);
    }

    // Step 5: Fetch audio features for the track
    const audioFeatures = await getAudioFeatures(accessToken, trackId);

    // Step 6: Combine track info and audio features
    const response = {
      trackInfo: trackInfo.track,
      audioFeatures: audioFeatures.length > 0 ? audioFeatures[0] : null,  // Should return only one entry for a single track
    };

    console.log(`Fetched currently playing track and audio features for user: ${userId}`);

    // Step 7: Return combined data
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully fetched currently playing track for user: ${userId}`,
        data: response,
      }),
    };

  } catch (error) {
    // Error handling
    console.error(`Error fetching currently playing track for user: ${userId} - ${error.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch currently playing track for user: ${userId}`,
        error: error.message,
      }),
    };
  }
};
