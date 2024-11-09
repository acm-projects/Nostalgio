import { addFollower } from '../followerService.js';

/**
 * Handler for following a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const followUserHandler = async (event) => {
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

    console.log(`User ${followerId} is attempting to follow user ${userId}`);

    // Step 3: Add follower relationship in FollowersTable
    const followerEntry = await addFollower(userId, followerId);

    console.log(`User ${followerId} successfully followed user ${userId}`);

    // Step 4: Return a success response with the new follower entry
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Followed user successfully',
        followerEntry,
      }),
    };
  } catch (error) {
    console.error(`Error following user: ${userId} by follower: ${followerId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to follow user', error: error.message }),
    };
  }
};
