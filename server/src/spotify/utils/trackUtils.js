import axios from 'axios';
import { validateSpotifyToken } from '../../auth/spotify/spotifyTokenManager.js';  // Ensure token is valid before making the request
import { fetchArtistsGenres } from './genreUtils.js';  // Fetch genres for the artist

/**
 * Helper function to fetch Spotify track information by track ID for a specific user.
 * 
 * @param {string} userId - The user ID for the authenticated Spotify user.
 * @param {string} trackId - The Spotify track ID to fetch information for.
 * @returns {Object} - The track details including artist, album, genres, and other metadata.
 */
export const getTrackInfo = async (userId, trackId) => {
  try {
    // Validate input parameters
    if (!userId || !trackId) {
      throw new Error('Missing userId or trackId.');
    }

    console.log(`[INFO] Initiating track fetch for user: ${userId} and track ID: ${trackId}`);

    // Step 1: Validate the Spotify access token
    const tokenValidationResponse = await validateSpotifyToken({ pathParameters: { userId } });

    if (!tokenValidationResponse || !tokenValidationResponse.body) {
      throw new Error(`[ERROR] Spotify token validation failed for user: ${userId}`);
    }

    // Step 2: Parse the access token from the validation response
    const { accessToken } = JSON.parse(tokenValidationResponse.body);
    if (!accessToken) {
      throw new Error(`[ERROR] Access token is missing in response for user: ${userId}`);
    }

    console.log(`[INFO] Access token obtained for user: ${userId}. Fetching track details for track ID: ${trackId}`);

    // Step 3: Make a request to the Spotify API to get track information
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const track = response.data;
    const primaryArtistId = track.artists[0].id;  // Use the primary artist ID for genre information

    console.log(`[INFO] Track details fetched for user: ${userId} and track ID: ${trackId}. Fetching genres for artist ID: ${primaryArtistId}`);

    // Step 4: Fetch genres associated with the primary artist
    const genres = await fetchArtistsGenres(userId, primaryArtistId);

    // Step 5: Format the track information
    const formattedTrack = {
      id: track.id,
      name: track.name,
      album: {
        name: track.album.name,
        release_date: track.album.release_date,
        images: track.album.images,
      },
      artists: track.artists.map(artist => ({
        id: artist.id,
        name: artist.name,
      })),
      genres,  // Artist's genres
      duration_ms: track.duration_ms,
      explicit: track.explicit,
      popularity: track.popularity,
      track_url: track.external_urls.spotify,
      uri: track.uri,
    };

    console.log(`[INFO] Successfully formatted track details for user: ${userId} and track ID: ${trackId}`);
    return { success: true, track: formattedTrack };

  } catch (error) {
    console.error(`[ERROR] Failed to fetch track details for user: ${userId} and track ID: ${trackId} - ${error.message}`);
    return {
      success: false,
      message: `Failed to fetch track details for user: ${userId} and track ID: ${trackId}`,
      error: error.message,
    };
  }
};

/**
 * Aggregate play counts for each track at the specified location.
 * 
 * This function takes a list of listening history items and combines multiple plays of the same track,
 * tallying up the play count for each unique track ID.
 * 
 * @param {Array} items - The retrieved listening history records.
 * @returns {Array} - A list of tracks with aggregated play counts.
 */
export const aggregatePlayCount = (items) => {
    if (!Array.isArray(items)) {
        console.warn(`[WARN] Invalid input type for aggregatePlayCount. Expected an array but received ${typeof items}`);
        return [];
    }

    const trackPlayCount = {};

    items.forEach(item => {
        const trackId = item.trackId;

        if (!trackPlayCount[trackId]) {
            trackPlayCount[trackId] = {
                ...item,
                playCount: 1
            };
            console.log(`[INFO] Initialized play count for track ID: ${trackId}`);
        } else {
            trackPlayCount[trackId].playCount += 1;
            console.log(`[INFO] Incremented play count for track ID: ${trackId}. New count: ${trackPlayCount[trackId].playCount}`);
        }
    });

    const aggregatedTracks = Object.values(trackPlayCount);
    console.log(`[INFO] Aggregated play counts for ${aggregatedTracks.length} unique tracks.`);
    
    return aggregatedTracks;
};
