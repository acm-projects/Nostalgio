import { storeCodeVerifier } from '../session/authSessionManager.js';  // Correct import for session management
import { generateCodeVerifier, generateCodeChallenge } from '../../utils/crypto.js';  // Import crypto utilities
import { v4 as uuidv4 } from 'uuid';  // For generating temporary user IDs

// Define Spotify scopes required for authorization
const scopes = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-follow-read',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
].join(' ');  // Scopes need to be space-separated

/**
 * Spotify Authorization Handler
 * This handler initiates the authorization flow with Spotify by generating a code verifier and challenge.
 * It redirects the user to the Spotify login page for authorization.
 * 
 * @param {Object} event - Lambda event, typically from API Gateway.
 * @returns {Object} - Redirect response to Spotify authorization page.
 */
export const spotifyAuthHandler = async (event) => {
  try {
    // Generate code verifier and code challenge for PKCE flow
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    // Check if the user is already logged in via Cognito (using Cognito authorizer)
    let userId = event.requestContext?.authorizer?.claims?.sub;

    // If userId is not available (i.e., new user), generate a temporary user ID
    if (!userId) {
      userId = uuidv4();  // Generate temporary user ID for new users
      console.log('Generated temporary user ID:', userId);
    } else {
      console.log('Authenticated user ID from Cognito:', userId);
    }

    // Store the code verifier in DynamoDB, associated with the userId
    await storeCodeVerifier(userId, codeVerifier);
    console.log(`Stored code verifier for user: ${userId}`);

    // Construct the Spotify authorization URL
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${userId}`;

    // Return a 302 redirect to Spotify login with the authorization URL
    return {
      statusCode: 302,
      headers: {
        Location: authUrl,  // Redirect to Spotify login
        'x-temporary-id': userId,  // Pass temporary ID as a header in case of a new user
      },
    };
  } catch (error) {
    console.error('Error in Spotify authorization handler:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to initiate Spotify authorization', error: error.message }),
    };
  }
};
