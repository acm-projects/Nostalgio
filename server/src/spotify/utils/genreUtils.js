import axios from 'axios';
import { validateSpotifyToken } from '../../auth/spotify/spotifyTokenManager.js';  // Ensure valid Spotify token

/**
 * Fetch genres for a specific artist from Spotify by artist ID.
 * 
 * @param {String} userId - The user's unique ID to validate the token.
 * @param {String} artistId - The Spotify artist ID to retrieve genres.
 * @returns {Array} - An array of genres for the given artist.
 */
export const fetchArtistsGenres = async (userId, artistId) => {
  try {
    console.log(`Fetching genres for artist: ${artistId} for user: ${userId}`);

    // Step 1: Validate Spotify token for the user
    const tokenValidationResponse = await validateSpotifyToken({ pathParameters: { userId } });

    if (!tokenValidationResponse || !tokenValidationResponse.body) {
      throw new Error(`Unable to retrieve valid Spotify token for user: ${userId}`);
    }

    // Step 2: Extract access token from validation response
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`Access token missing for user: ${userId}`);
    }

    // Step 3: Make a request to Spotify API to fetch artist information
    const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Step 4: Extract genres from the artist data
    const artistGenres = artistResponse.data.genres;

    console.log(`Fetched genres for artist: ${artistId}: ${artistGenres.join(', ')}`);

    // Step 5: Return the genres
    return artistGenres;

  } catch (error) {
    console.error(`Error fetching genres for artist: ${artistId}, user: ${userId} - ${error.message}`);
    throw new Error('Failed to fetch artist genres.');
  }
};

/**
 * Extract unique genres from an array of Spotify artists.
 * Each artist may have multiple genres, so this function accumulates and counts occurrences.
 * 
 * @param {Array} artists - The array of artist objects from a Spotify API response.
 * @returns {Array} - Array of genres sorted by frequency of occurrence (highest to lowest).
 */
export const extractGenres = (artists) => {
    if (!artists || artists.length === 0) {
      console.log('No artists available to extract genres from.');
      return [];
    }
  
    const genreCount = {};
  
    // Loop through each artist and accumulate genre counts
    artists.forEach(artist => {
      if (artist.genres && artist.genres.length > 0) {
        artist.genres.forEach(genre => {
          if (genreCount[genre]) {
            genreCount[genre]++;
          } else {
            genreCount[genre] = 1;
          }
        });
      }
    });
  
    // Convert genreCount object into an array and sort by frequency
    const sortedGenres = Object.keys(genreCount)
      .map(genre => ({ genre, count: genreCount[genre] }))
      .sort((a, b) => b.count - a.count);  // Sort by frequency (highest first)
  
    console.log(`Extracted and sorted ${sortedGenres.length} genres.`);
    return sortedGenres;
  };
  
  /**
   * Get the top genres from an array of Spotify artists.
   * 
   * @param {Array} artists - The array of artist objects.
   * @param {number} limit - The number of top genres to return (default is 5).
   * @returns {Array} - Array of top genres with their counts.
   */
  export const getTopGenres = (artists, limit = 5) => {
    const sortedGenres = extractGenres(artists);
  
    // Return only the top 'limit' genres or all genres if less than limit
    return sortedGenres.slice(0, limit);
  };