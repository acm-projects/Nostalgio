import { queryTracksByGeohashOrRadius } from '../listeningHistory/geoManager.js';
import { getUserTopGenresAndArtists } from '../spotify/tracks/trackService.js';
import { getRecentTracksHandler } from '../spotify/tracks/handlers/getRecentTracks.js';
import { aggregatePlayCount } from '../spotify/utils/trackUtils.js';

/**
 * Suggest songs based on the user's current location and their listening habits.
 * 
 * This function uses a combination of location-based track data, the user's top genres/artists,
 * and recent listening habits to generate personalized music recommendations.
 * 
 * @param {String} userId - The user's unique ID.
 * @param {Object} location - The user's current location (latitude, longitude).
 * @param {Number} [radius] - Optional search radius in meters. Defaults to city-level precision.
 * @param {Object} [weights] - Optional weights for scoring criteria (frequency, genre, artist, tempo).
 * @returns {Array} - An array of recommended songs with their calculated scores.
 */
export const suggestSongsByLocation = async (userId, location, radius = null, weights = { frequency: 0.45, genre: 0.35, artist: 0.10, tempo: 0.10 }) => {
    try {
        console.log(`[INFO] Starting music suggestion for user: ${userId} at location: (${location.lat}, ${location.lon}) with radius: ${radius || 'city-level precision'}`);

        const { userTopGenres, userTopArtists } = await getUserTopGenresAndArtists(userId);
        console.log(`[INFO] Retrieved top genres for user: ${userTopGenres}, and top artists for user: ${userTopArtists}`);

        const recentTracksResponse = await getRecentTracksHandler({ pathParameters: { userId } });
        const recentTracks = JSON.parse(recentTracksResponse.body).tracks;
        console.log(`[INFO] Retrieved ${recentTracks.length} recent tracks for user: ${userId}`);

        let locationTracks = await queryTracksByGeohashOrRadius(location.lat, location.lon, radius);
        console.log(`[INFO] Found ${locationTracks.length} tracks near user location`);

        locationTracks = aggregatePlayCount(locationTracks);
        console.log(`[INFO] Aggregated play counts for ${locationTracks.length} tracks`);

        const uniqueTracks = new Set();
        const recommendations = locationTracks
            .map(track => {
                const frequencyScore = calculateFrequencyScore(track.playCount, locationTracks);
                const genreScore = track.genres?.some(genre => userTopGenres.includes(genre.toLowerCase())) ? 1 : 0;
                const artistScore = track.artistIds?.some(artistId => userTopArtists.includes(artistId)) ? 1 : 0;
                const tempoScore = calculateTempoMatch(track.audioFeatures?.tempo, recentTracks);

                const overallScore = (weights.frequency * frequencyScore) +
                                     (weights.genre * genreScore) +
                                     (weights.artist * artistScore) +
                                     (weights.tempo * tempoScore);

                return { track, score: overallScore };
            })
            .filter(({ track }) => {
                if (uniqueTracks.has(track.trackId)) {
                    return false; // Exclude if already processed
                } else {
                    uniqueTracks.add(track.trackId); // Mark as processed
                    return true; // Include if not yet processed
                }
            });

        recommendations.sort((a, b) => b.score - a.score);
        console.log(`[INFO] Returning top ${Math.min(10, recommendations.length)} unique recommendations for user: ${userId}`);
        
        return recommendations.slice(0, 10);

    } catch (error) {
        console.error(`[ERROR] Error generating music suggestions for user: ${userId} - ${error.message}`);
        throw new Error('Failed to generate music suggestions.');
    }
};


/**
 * Calculate the normalized frequency score for a track.
 * 
 * @param {Number} trackPlayCount - The number of times the track was played at the location.
 * @param {Array} allLocationTracks - The list of all tracks played at the location.
 * @returns {Number} - A normalized score between 0 and 1.
 */
const calculateFrequencyScore = (trackPlayCount, allLocationTracks) => {
    const maxPlayCount = Math.max(...allLocationTracks.map(track => track.playCount)) || 1;
    const score = trackPlayCount / maxPlayCount;
    console.log(`[INFO] Calculated frequency score: ${score} (track play count: ${trackPlayCount}, max play count: ${maxPlayCount})`);
    return score;
};

/**
 * Calculate how well the track's tempo matches the user's recent tracks.
 * 
 * @param {Number} trackTempo - The tempo of the track.
 * @param {Array} recentTracks - The user's recent tracks.
 * @returns {Number} - A score between 0 and 1 based on tempo similarity.
 */
const calculateTempoMatch = (trackTempo, recentTracks) => {
    const validRecentTracks = recentTracks.filter(track => track.audio_features?.tempo !== null);

    if (validRecentTracks.length === 0) {
        console.warn(`[WARN] No valid tempo data in recent tracks.`);
        return 0;
    }

    const userAverageTempo = validRecentTracks.reduce((sum, track) => sum + track.audio_features.tempo, 0) / validRecentTracks.length;
    const tempoDifference = Math.abs(trackTempo - userAverageTempo);
    const score = 1 - (tempoDifference / userAverageTempo);
    console.log(`[INFO] Calculated tempo match score: ${score} (track tempo: ${trackTempo}, user avg tempo: ${userAverageTempo})`);
    return score;
};

/**
 * Utility to sanitize score values and handle NaN cases.
 * 
 * @param {Number} score - The score to sanitize.
 * @returns {Number} - The sanitized score, returning 0 if NaN.
 */
const sanitizeScore = (score) => isNaN(score) ? 0 : score;
