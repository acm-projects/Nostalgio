import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';  // Token validation
import { getSpotifyUserProfile as fetchUserProfile } from '../userService.js';  // Fetch Spotify user profile

/**
 * Handler to get the Spotify User Profile.
 * 
 * @param {Object} event - The API Gateway Lambda event object.
 * @returns {Object} - The response containing the user profile or an error message.
 */
export const getSpotifyUserProfile = async (event) => {
  try {
    // Step 1: Extract userId from path parameters
    const { userId } = event.pathParameters;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId in path parameters' }),
      };
    }

    console.log(`Fetching Spotify profile for user: ${userId}`);

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

    // Step 4: Fetch the user's profile using the access token
    const userProfile = await fetchUserProfile(accessToken);

    // Step 5: Return the user profile data
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully fetched Spotify profile for user: ${userId}`,
        userProfile,
      }),
    };

  } catch (error) {
    // Step 6: Error handling
    console.error(`Error fetching Spotify profile for userId: ${userId} - ${error.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to fetch Spotify profile for user: ${userId}`,
        error: error.message,
      }),
    };
  }
};
