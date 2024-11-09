import { getFollowing } from '../followerService.js';
import { getUsersByIds } from '../../users/userService.js';

/**
 * Handler to get the list of users a specific user is following, including additional profile details.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters.
 * @returns {Object} - HTTP response with a list of users the specified user is following or an error message.
 */
export const getFollowingHandler = async (event) => {
  let followerId;

  try {
    // Step 1: Extract followerId from path parameters
    ({ followerId } = event.pathParameters);

    // Step 2: Validate that followerId is provided
    if (!followerId) {
      console.warn('Missing followerId in the request');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing followerId' }),
      };
    }

    console.log(`Retrieving following list for user: ${followerId}`);

    // Step 3: Retrieve the list of followed users' IDs from FollowersTable
    const following = await getFollowing(followerId);
    const followedUserIds = following.map(follow => follow.userId);

    console.log(`Retrieved IDs of followed users for follower ${followerId}:`, followedUserIds);

    // Step 4: Retrieve detailed information for each followed user
    const followedUsersDetails = await getUsersByIds(followedUserIds);

    console.log(`Successfully retrieved detailed information for ${followedUsersDetails.length} followed users of follower: ${followerId}`);

    // Step 5: Construct the response payload with followed user details, including profile images
    const responsePayload = followedUsersDetails.map(user => ({
      UserId: user.UserId,
      Email: user.Email,
      SpotifyUserId: user.SpotifyUserId,
      DisplayName: user.DisplayName,
      SpotifyProfileImageUrl: user.SpotifyProfileImageUrl,  // Spotify profile image
      CustomProfileImageUrl: user.CustomProfileImageUrl,    // Custom uploaded profile image
    }));

    // Step 6: Return the list of users being followed with profile details
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Following list retrieved successfully',
        following: responsePayload,
      }),
    };
  } catch (error) {
    console.error(`Error retrieving following list for user: ${followerId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve following list', error: error.message }),
    };
  }
};
