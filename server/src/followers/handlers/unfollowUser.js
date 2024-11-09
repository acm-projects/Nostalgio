import { removeFollower } from '../followerService.js';

/**
 * Handler for unfollowing a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const unfollowUserHandler = async (event) => {
  let userId, followerId;

  try {
    // Step 1: Extract userId and followerId from path parameters
    ({ userId, followerId } = event.pathParameters);

    // Step 2: Validate that both userId and followerId are provided
    if (!userId || !followerId) {
      console.warn('Missing userId or followerId in the request');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId or followerId' }),
      };
    }

    console.log(`User ${followerId} is attempting to unfollow user ${userId}`);

    // Step 3: Remove follower relationship in FollowersTable
    await removeFollower(userId, followerId);

    console.log(`User ${followerId} successfully unfollowed user ${userId}`);

    // Step 4: Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Unfollowed user successfully',
        userId,
        followerId,
      }),
    };
  } catch (error) {
    console.error(`Error unfollowing user: ${userId} by follower: ${followerId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to unfollow user', error: error.message }),
    };
  }
};
