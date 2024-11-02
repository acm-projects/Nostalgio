import { queryTracksByGeohashOrRadius, storeTrackWithLocation } from './geoManager.js';
import { aggregatePlayCount } from '../spotify/utils/trackUtils.js';

/**
 * Store a user's listening history with location data.
 * 
 * This function captures the user's listening habits by associating a track with the user's location.
 * 
 * @param {Object} listeningData - The data to store (userId, trackId, artistIds, lat, lon, genres, audioFeatures, track_url, album).
 * @returns {Promise} - A promise that resolves when the data is successfully stored.
 */
export const storeListeningHistory = async (listeningData) => {
    const { userId, trackId, artistIds, lat, lon, genres, audioFeatures, track_url, album } = listeningData;

    // Input validation for required fields
    if (!userId || !trackId || !lat || !lon || !genres || !track_url || !album) {
        console.error('[ERROR] Missing required fields for storing listening history.');
        throw new Error('Incomplete data for storing listening history.');
    }

    try {
        console.log(`[INFO] Storing listening history for user: ${userId}, track ID: ${trackId} at location: (${lat}, ${lon})`);

        // Prepare itemData with necessary track and user details
        const itemData = {
            userId,
            trackId,
            artistIds,     // Ensure artistIds is an array of artist IDs
            genres,        // Pass genres to assist with recommendation filtering
            audioFeatures, // Include audio features (tempo, energy, danceability, etc.)
            track_url,     // Store Spotify track URL for easy retrieval
            album          // Include album metadata (name, release date, images)
        };

        // Store track information using geolocation and item data
        await storeTrackWithLocation(lat, lon, itemData);

        console.log(`[INFO] Successfully stored listening history for track ID: ${trackId} at (${lat}, ${lon})`);
    } catch (error) {
        console.error(`[ERROR] Failed to store listening history: ${error.message}`);
        throw new Error('Error while storing listening history.');
    }
};

/**
 * Fetch and aggregate listening history for a specific location (with optional radius).
 * 
 * Retrieves tracks listened to within a specific location and aggregates them based on play counts.
 * 
 * @param {Number} lat - Latitude of the location.
 * @param {Number} lon - Longitude of the location.
 * @param {Number} [radius] - Optional radius in meters for extended search. Defaults to city-level geohash if not provided.
 * @returns {Array} - An array of tracks with aggregated play counts.
 */
export const getListeningHistoryByLocation = async (lat, lon, radius = null) => {
    try {
        console.log(`[INFO] Retrieving listening history for location: (${lat}, ${lon}), radius: ${radius || 'city-level precision'}`);

        // Fetch nearby tracks using location data and optional radius
        const nearbyTracks = await queryTracksByGeohashOrRadius(lat, lon, radius);

        if (nearbyTracks.length === 0) {
            console.warn(`[WARN] No tracks found for location: (${lat}, ${lon}) with radius: ${radius || 'default'}`);
        } else {
            console.log(`[INFO] Retrieved ${nearbyTracks.length} tracks from location: (${lat}, ${lon})`);
        }

        // Aggregate play counts for all retrieved tracks
        const aggregatedTracks = aggregatePlayCount(nearbyTracks);

        console.log(`[INFO] Aggregated play counts for ${aggregatedTracks.length} unique tracks.`);
        return aggregatedTracks;
    } catch (error) {
        console.error(`[ERROR] Failed to retrieve listening history by location: ${error.message}`);
        throw new Error('Error while retrieving listening history.');
    }
};
