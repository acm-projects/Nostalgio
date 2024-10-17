import { getUserFromDynamoDB } from '../userService.js';

export const getUserHandler = async (event) => {
  const { userId, spotifyUserId } = event.pathParameters || {};

  // Ensure that either userId or spotifyUserId is provided
  if (!userId && !spotifyUserId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Either userId or spotifyUserId must be provided' }),
    };
  }

  try {
    let user;

    if (userId) {
      // Query using UserId (Cognito sub)
      user = await getUserFromDynamoDB(userId, 'UserId');
    } else if (spotifyUserId) {
      // Query using SpotifyUserId (GSI)
      user = await getUserFromDynamoDB(spotifyUserId, 'SpotifyUserId');
    }

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to get user', error: error.message }),
    };
  }
};
