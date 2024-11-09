import { getFollowers } from '../followerService.js';
import { getUsersByIds } from '../../users/userService.js';

/**
 * Handler to get the list of followers for a user, including additional profile details.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters.
 * @returns {Object} - HTTP response with a list of followers or an error message.
 */
export const getFollowersHandler = async (event) => {
  let userId;

  try {
    // Step 1: Extract userId from path parameters
    ({ userId } = event.pathParameters);

    // Step 2: Validate that userId is provided
    if (!userId) {
      console.warn('Missing userId in the request');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId' }),
      };
    }

    console.log(`Retrieving followers for user: ${userId}`);

    // Step 3: Retrieve follower IDs from FollowersTable
    const followers = await getFollowers(userId);
    const followerIds = followers.map(follower => follower.followerId);

    console.log(`Retrieved follower IDs for user ${userId}:`, followerIds);

    // Step 4: Retrieve detailed user information for each follower
    const followerDetails = await getUsersByIds(followerIds);

    console.log(`Successfully retrieved detailed information for ${followerDetails.length} followers of user: ${userId}`);

    // Step 5: Construct the response payload with follower details, including custom and Spotify profile images
    const responsePayload = followerDetails.map(follower => ({
      UserId: follower.UserId,
      Email: follower.Email,
      SpotifyUserId: follower.SpotifyUserId,
      DisplayName: follower.DisplayName,
      SpotifyProfileImageUrl: follower.SpotifyProfileImageUrl,  // Spotify profile image
      CustomProfileImageUrl: follower.CustomProfileImageUrl,    // Custom uploaded profile image
    }));

    // Step 6: Return the list of followers with profile details
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Followers retrieved successfully',
        followers: responsePayload,
      }),
    };
  } catch (error) {
    console.error(`Error retrieving followers for user: ${userId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve followers', error: error.message }),
    };
  }
};
