import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';  // Ensure token is valid before making the request
import { getAudioFeatures } from '../../utils/audioFeaturesUtils.js';  // For fetching audio features

/**
 * Fetch the top tracks from Spotify for the authenticated user, including audio features.
 * 
 * @param {Object} event - The API Gateway Lambda event object.
 * @returns {Object} - The response containing the top tracks or an error message.
 */
export const getTopTracksHandler = async (event) => {
  try {
    // Step 1: Extract the userId from path parameters
    const { userId } = event.pathParameters;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId in path parameters' }),
      };
    }

    console.log(`Fetching top tracks for user: ${userId}`);

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

    // Step 4: Spotify API request to get user's top tracks
    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,  // Pass the validated access token
      },
      params: {
        limit: 10,  // Limit the number of tracks to 10
        time_range: 'medium_term',  // Can be 'short_term', 'medium_term', 'long_term'
      },
    });

    // Step 5: Extract track IDs for audio features lookup
    const trackIds = response.data.items.map(track => track.id);

    // Log the actual array of track IDs to ensure it's an array
    console.log('trackIds array:', trackIds);

    if (!Array.isArray(trackIds) || trackIds.length === 0) {
      throw new Error('No track IDs found or invalid data returned from Spotify.');
    }

    // Step 6: Fetch audio features for the tracks
    const audioFeatures = await getAudioFeatures(accessToken, trackIds);

    // Step 7: Format the response to include essential track data and audio features
    const formattedTracks = response.data.items.map((track, index) => ({
      trackId: track.id,  // Include the trackId in the response
      name: track.name,
      popularity: track.popularity,
      duration_ms: track.duration_ms,
      explicit: track.explicit,
      preview_url: track.preview_url,
      artists: item.track.artists.map(artist => ({
        name: artist.name,
        id: artist.id,  // Include artist ID here
      })),
      album: {
        name: track.album.name,
        release_date: track.album.release_date,
        total_tracks: track.album.total_tracks,
        images: track.album.images,
      },
      track_url: track.external_urls.spotify,
      uri: track.uri,
      audio_features: {
        tempo: audioFeatures[index]?.tempo || null,
        danceability: audioFeatures[index]?.danceability || null,
        energy: audioFeatures[index]?.energy || null,
      },  // Include key audio features
    }));

    // Step 8: Log the formatted response for debugging purposes
    console.log(`Fetched and formatted ${formattedTracks.length} top tracks for user: ${userId}`);

    // Step 9: Return the top tracks with audio features in the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully fetched top tracks for user: ${userId}`,
        tracks: formattedTracks,  // Return formatted tracks with audio features
      }),
    };

  } catch (error) {
    // Step 10: Error handling
    console.error(`Error fetching top tracks for user: ${userId} - ${error.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch top tracks for user: ${userId}`,
        error: error.message,
      }),
    };
  }
};
