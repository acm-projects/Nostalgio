import { getAllUsersExceptCurrent } from '../userService.js';
import { getFollowingIds } from '../../followers/followerService.js';

/**
 * Handler to retrieve a list of users available to follow.
 * Excludes users who are already followed by the current user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters.
 * @returns {Object} - HTTP response with a list of users available to follow or an error message.
 */
export const getAvailableUsersToFollowHandler = async (event) => {
  const { userId } = event.pathParameters;

  // Validate that userId is provided in the request path
  if (!userId) {
    console.warn('Missing userId in request path parameters');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing userId in request' }),
    };
  }

  try {
    console.log(`Retrieving available users to follow for userId: ${userId}`);

    // Step 1: Retrieve all users except the current user, including all necessary attributes
    const users = await getAllUsersExceptCurrent(userId);
    console.log(`Retrieved ${users.length} total users from UsersTable (excluding current user)`);

    // Step 2: Retrieve the list of user IDs that the current user is already following
    const followingIds = await getFollowingIds(userId) || [];
    console.log(`User ${userId} is currently following ${followingIds.length} users`);

    // Step 3: Filter out users who are already followed by the current user
    const availableToFollow = users.filter((user) => !followingIds.includes(user.UserId));

    // Construct the response payload, ensuring we return all relevant user details
    const responsePayload = availableToFollow.map((user) => ({
      UserId: user.UserId,
      Email: user.Email,
      DisplayName: user.DisplayName,
      SpotifyUserId: user.SpotifyUserId,
      SpotifyProfileImageUrl: user.SpotifyProfileImageUrl,  // Spotify profile image
      CustomProfileImageUrl: user.CustomProfileImageUrl,    // Custom uploaded profile image
    }));

    console.log(`Found ${responsePayload.length} users available to follow for userId: ${userId}`);

    // Return the list of users available to follow with all essential details
    return {
      statusCode: 200,
      body: JSON.stringify({
        totalAvailable: responsePayload.length,
        users: responsePayload,
      }),
    };
  } catch (error) {
    console.error(`Error retrieving available users to follow for userId: ${userId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve available users to follow', error: error.message }),
    };
  }
};
