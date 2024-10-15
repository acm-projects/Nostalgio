import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';  // Ensure token is valid before making the request
import { getTopGenres } from '../../utils/genreUtils.js';  // Genre utility for extracting genres

/**
 * Fetch the top artists and genres from Spotify for the authenticated user.
 * 
 * @param {Object} event - The API Gateway Lambda event object.
 * @returns {Object} - The response containing the top artists and genres or an error message.
 */
export const getTopArtistsHandler = async (event) => {
  try {
    // Step 1: Extract the userId from path parameters
    const { userId } = event.pathParameters;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId in path parameters' }),
      };
    }

    console.log(`Fetching top artists for user: ${userId}`);

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

    // Step 4: Spotify API request to get user's top artists
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,  // Pass the validated access token
      },
      params: {
        limit: 10,  // Limit the number of artists to 10
        time_range: 'medium_term',  // Can be 'short_term', 'medium_term', 'long_term'
      },
    });

    const artists = response.data.items;

    // Step 5: Extract top genres using genreUtils
    const topGenres = getTopGenres(artists, 5);  // You can adjust the limit dynamically if needed

    // Step 6: Format the response to include essential artist data and top genres
    const formattedArtists = artists.map(artist => ({
      id: artist.id,
      name: artist.name,
      popularity: artist.popularity,
      genres: artist.genres,
      images: artist.images,  // Include images
      artist_url: artist.external_urls.spotify,  // Link to artist on Spotify
      uri: artist.uri,  // Spotify URI for the artist
    }));

    console.log(`Fetched and formatted ${formattedArtists.length} top artists for user: ${userId}`);

    // Step 7: Return the top artists and genres in the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully fetched top artists and genres for user: ${userId}`,
        artists: formattedArtists,
        topGenres,  // Include the top genres in the response
      }),
    };

  } catch (error) {
    // Step 8: Error handling
    console.error(`Error fetching top artists for user: ${userId} - ${error.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch top artists for user: ${userId}`,
        error: error.message,
      }),
    };
  }
};
