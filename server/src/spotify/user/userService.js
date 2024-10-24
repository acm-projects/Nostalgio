import axios from 'axios';

/**
 * Fetch Spotify User Profile using the access token.
 *
 * This function is responsible for interacting with Spotify's API to fetch the user's profile.
 * It abstracts the logic of making the API request and formatting the response.
 * 
 * @param {string} accessToken - Spotify access token to authenticate the request.
 * @returns {Object} - The user profile details from Spotify API, including the user ID, name, email, and plan.
 * @throws {Error} - Throws an error if the profile fetching fails or if an invalid token is provided.
 */
export const getSpotifyUserProfile = async (accessToken) => {
  try {
    // Step 1: Make a request to Spotify API to fetch the user's profile information
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,  // Spotify API expects the access token in the Authorization header
      },
    });

    // Step 2: Log the successful retrieval of the user profile for debugging purposes
    console.log(`Successfully fetched Spotify user profile for userId: ${response.data.id}`);

    // Step 3: Return a formatted user profile with essential data
    return {
      id: response.data.id,  // Spotify user ID
      display_name: response.data.display_name,  // Display name of the user
      email: response.data.email,  // Email of the user
      country: response.data.country,  // Country of the user
      followers: response.data.followers.total,  // Number of followers the user has
      product: response.data.product,  // Spotify subscription plan (e.g., free, premium)
      images: response.data.images,    // Profile images if available
      external_urls: response.data.external_urls.spotify,  // Profile link on Spotify
      uri: response.data.uri,  // Spotify URI for the user
    };

  } catch (error) {
    // Step 4: Error handling, log the error message if something goes wrong
    console.error('Error fetching Spotify user profile:', error.message);

    // Throw an error back to the calling function, with an appropriate message
    throw new Error('Failed to fetch Spotify user profile. Please check the access token or user permissions.');
  }
};
