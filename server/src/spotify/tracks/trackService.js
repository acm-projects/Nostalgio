import { getTopArtistsHandler } from './handlers/getTopArtists.js';  // Fetch top artists
import { getTopGenres } from '../utils/genreUtils.js';  // Utility function to extract genres

/**
 * Fetches the user's top genres and artists by analyzing their top artists.
 * @param {String} userId - The user's unique ID.
 * @returns {Object} - An object containing arrays of the user's top genres and top artists.
 */
export const getUserTopGenresAndArtists = async (userId) => {
    try {
        // Fetch top artists for the user (Spotify provides genre data from artists, not tracks)
        const topArtistsResponse = await getTopArtistsHandler({ pathParameters: { userId } });
        const topArtists = JSON.parse(topArtistsResponse.body).artists;

        // Extract top genres using the genre utility function
        const topGenres = getTopGenres(topArtists, 5);  // Adjust the number of genres to extract if necessary

        // Return the user's top genres and artists
        return {
            userTopGenres: topGenres,
            userTopArtists: topArtists.map(artist => artist.id),  // Return an array of artist IDs
        };

    } catch (error) {
        console.error(`Error fetching top genres and artists for userId: ${userId}`, error);
        throw new Error('Failed to fetch user’s top genres and artists.');
    }
};
