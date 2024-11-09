import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);
const FOLLOWERS_TABLE = process.env.FOLLOWERS_TABLE;

/**
 * Adds a follower relationship between a user and a follower.
 *
 * @param {string} userId - The ID of the user being followed.
 * @param {string} followerId - The ID of the user who is following.
 * @returns {Object} - The new or updated follower entry.
 */
export const addFollower = async (userId, followerId) => {
  const followedAt = new Date().toISOString();
  const mutual = await isMutualFollowing(userId, followerId);
  const isFollowingBack = mutual ? "following" : "follow back";

  const params = {
    TableName: FOLLOWERS_TABLE,
    Item: {
      userId,
      followerId,
      isFollowingBack,
      mutual,
      followedAt,
    },
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    console.log(`Added follower: ${followerId} following user: ${userId} with mutual status: ${mutual}`);
    return params.Item;
  } catch (error) {
    console.error(`Error adding follower for userId: ${userId}, followerId: ${followerId} - ${error.message}`);
    throw new Error('Failed to add follower relationship');
  }
};

/**
 * Removes a follower relationship.
 *
 * @param {string} userId - The ID of the user being unfollowed.
 * @param {string} followerId - The ID of the user who is unfollowing.
 */
export const removeFollower = async (userId, followerId) => {
  const params = {
    TableName: FOLLOWERS_TABLE,
    Key: { userId, followerId },
  };

  try {
    await dynamoDb.send(new DeleteCommand(params));
    console.log(`Removed follower: ${followerId} from user: ${userId}`);
  } catch (error) {
    console.error(`Error removing follower for userId: ${userId}, followerId: ${followerId} - ${error.message}`);
    throw new Error('Failed to remove follower relationship');
  }
};

/**
 * Retrieves the followers of a specific user.
 *
 * @param {string} userId - The ID of the user whose followers are to be retrieved.
 * @returns {Array} - List of follower entries.
 */
export const getFollowers = async (userId) => {
  const params = {
    TableName: FOLLOWERS_TABLE,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  try {
    const result = await dynamoDb.send(new QueryCommand(params));
    console.log(`Retrieved ${result.Items.length} followers for user: ${userId}`);
    return result.Items;
  } catch (error) {
    console.error(`Error retrieving followers for userId: ${userId} - ${error.message}`);
    throw new Error('Failed to retrieve followers');
  }
};

/**
 * Retrieves the list of users that a given user is following.
 *
 * @param {string} followerId - The ID of the user whose following list is to be retrieved.
 * @returns {Array} - List of following entries.
 */
export const getFollowing = async (followerId) => {
  const params = {
    TableName: FOLLOWERS_TABLE,
    IndexName: "FollowerIdIndex",
    KeyConditionExpression: "followerId = :followerId",
    ExpressionAttributeValues: {
      ":followerId": followerId,
    },
  };

  try {
    const result = await dynamoDb.send(new QueryCommand(params));
    console.log(`Retrieved ${result.Items.length} following entries for user: ${followerId}`);
    return result.Items;
  } catch (error) {
    console.error(`Error retrieving following list for followerId: ${followerId} - ${error.message}`);
    throw new Error('Failed to retrieve following list');
  }
};

/**
 * Retrieves a list of user IDs that a given user is following.
 *
 * @param {string} followerId - The ID of the user whose following list is to be retrieved.
 * @returns {Array} - List of user IDs that the user is following.
 */
export const getFollowingIds = async (followerId) => {
  const params = {
    TableName: FOLLOWERS_TABLE,
    IndexName: "FollowerIdIndex",
    KeyConditionExpression: "followerId = :followerId",
    ExpressionAttributeValues: {
      ":followerId": followerId,
    },
    ProjectionExpression: "userId", // Retrieve only userId to minimize data load
  };

  try {
    const result = await dynamoDb.send(new QueryCommand(params));
    const followingIds = result.Items.map((item) => item.userId);
    console.log(`Retrieved ${followingIds.length} following IDs for user: ${followerId}`);
    return followingIds;
  } catch (error) {
    console.error(`Error retrieving following IDs for followerId: ${followerId} - ${error.message}`);
    throw new Error('Failed to retrieve following IDs');
  }
};

/**
 * Checks if a mutual following relationship exists between two users.
 *
 * @param {string} userId - The ID of the user being followed.
 * @param {string} followerId - The ID of the user following.
 * @returns {boolean} - True if a mutual relationship exists, otherwise false.
 */
const isMutualFollowing = async (userId, followerId) => {
  const params = {
    TableName: FOLLOWERS_TABLE,
    Key: { userId: followerId, followerId: userId },
  };

  try {
    const result = await dynamoDb.send(new GetCommand(params));
    const mutual = !!result.Item;
    console.log(`Checked mutual follow status for userId: ${userId} and followerId: ${followerId} - Mutual: ${mutual}`);
    return mutual;
  } catch (error) {
    console.error(`Error checking mutual follow status for userId: ${userId}, followerId: ${followerId} - ${error.message}`);
    throw new Error('Failed to check mutual follow status');
  }
};
