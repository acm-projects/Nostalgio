import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';
import { getUserFromDynamoDB } from '../../../users/userService.js'; // Adjusted path

/**
 * Handler to create a new Spotify playlist for a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and body.
 * @returns {Object} - HTTP response with the playlist details or an error message.
 */
export const createPlaylistHandler = async (event) => {
  try {
    // Step 1: Extract userId from the path parameters
    const { userId } = event.pathParameters;

    // Step 2: Retrieve the Spotify user ID from DynamoDB
    console.log(`Fetching Spotify user ID for Cognito user: ${userId}`);
    const user = await getUserFromDynamoDB(userId);
    const spotifyUserId = user?.SpotifyUserId;

    if (!spotifyUserId) {
      console.warn(`Spotify user ID not found for user: ${userId}`);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Spotify user ID not found for this user' }),
      };
    }

    // Step 3: Retrieve the access token after validating it
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }

    // Step 4: Extract playlist name and visibility preference from request body
    const { playlistName, isPublic = true } = JSON.parse(event.body);
    if (!playlistName) {
      console.warn('Missing playlistName in the request');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Playlist name is required' }),
      };
    }

    console.log(`Creating Spotify playlist for Spotify user: ${spotifyUserId}, playlistName: ${playlistName}, public: ${isPublic}`);

    // Step 5: Make the API call to Spotify to create a new playlist
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`,
      { name: playlistName, public: isPublic },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { id: playlistId, external_urls: { spotify: spotifyUrl }, name, description, images, snapshot_id, owner } = response.data;
    console.log(`Successfully created Spotify playlist with ID: ${playlistId} for Spotify user: ${spotifyUserId}`);

    // Step 6: Return a success response with the playlist details
    const createdAt = new Date().toISOString();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Playlist created successfully',
        playlistId,
        spotifyUrl,
        name,
        description,
        images,
        snapshot_id,
        owner,
        createdAt,
      }),
    };
  } catch (error) {
    console.error(`Error creating playlist for user: ${userId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create playlist', error: error.message }),
    };
  }
};
