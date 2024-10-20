import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient} from "@aws-sdk/client-dynamodb";
const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

/**
 * Store a new badge in DynamoDB BadgesTable.
 * 
 *  @param {Object} badgeData - the badge that is stored in DynamoDB
 *  @param {string} badgeData.userId - partition key
 *  @param {string} badgeData.city - sort key
 *  @param {string} badgeData.country
 *  @param {string} badgeData.lastVisitedDate - GSI sort key 
 *  visitCount attribute is either incremented or starts at 1 when new item created.
 * 
 */

export const storeOrUpdateBadgeInDynamoDB = async (badgeData) => {
    try {
        //Query DynamoDB to check if badge for userId and City exists
        const queryParams = {
            TableName: process.env.BADGES_TABLE,  // Main table name
            KeyConditionExpression: 'userId = :userId AND city = :city',
            ExpressionAttributeValues: {
                ':userId': badgeData.userId,
                ':city': badgeData.city,
            },
        };

        const existingBadge = await dynamoDb.send(new QueryCommand(queryParams));
        if(existingBadge.Items && existingBadge.Items.length > 0) {
            
            const updateParams = {
                TableName: process.env.BADGES_TABLE,
                Key: {
                    userId: badgeData.userId,
                    city: badgeData.city,
                },
                UpdateExpression: 'SET visitCount = visitCount + :inc, lastVisitedDate = :lastVisitedDate',
                ExpressionAttributeValues: {
                    ':inc': 1,
                    ':lastVisitedDate': badgeData.lastVisitedDate,
                },
                ReturnValues: 'UPDATED_NEW'
            };

            await dynamoDb.send(new UpdateCommand(updateParams));
            console.log(`Badge updated for userId: ${badgeData.userId}, city: ${badgeData.city}, country: ${badgeData.country}`);
        }
        else {
            const params = {
                TableName: process.env.BADGES_TABLE,
                Item: {
                    userId: badgeData.userId,
                    lastVisitedDate: badgeData.lastVisitedDate,
                    city: badgeData.city,
                    country: badgeData.country,
                    visitCount: 1,
        
                },
            };
        
            
                await dynamoDb.send(new PutCommand(params));
                console.log(`Badge stored in BADGES_TABLE for userId: ${badgeData.userId}`);
        }  
            
        } catch (error) {
            console.error(`Error storing or updating badge` , error);
            throw new Error('Failed to store badge');

        }
}

/**
 *   @param {string} userId - partition key to find most recent trips
 *   @returns {Array<Object>} - List of badges for the user.
 */

export const listRecentBadgesFromDynamoDB = async (userId) => {
    const params = {
        TableName: process.env.BADGES_TABLE,
        IndexName: 'userId-lastVisitedDate-index',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId' : userId
        },
        Limit: 10,
        ScanIndexForward: false,
    };

    try {
        const result = await dynamoDbClient.send(new QueryCommand(params));
        if (result.Items) {
            console.log(`Retrieved recent ${result.Items.length} badges for userId: ${userId}`);
            return result.Items;
        }
        else{
            console.log(`No badges found for userId: ${userId}`);
            return [];
        }
    } catch(error) {
        console.error('Error fetching recent badges:', error);
        throw new Error('Failed to fetch recent badges');
    }


};

/**
 * Delete a badge item from Badges.
 * 
 * @param {string} userId - The Cognito `sub` (userId).
 * @param {string} city - city visited.
 */
export const deleteBadgeFromDynamoDB = async (userId, city) => {
    const params = {
      TableName: process.env.BADGES_TABLE,
      Key: {
        userId: userId,
        city: city,
      },
    };
  
    try {
      await dynamoDb.send(new DeleteCommand(params));
      console.log(`Badge deleted from DynamoDB for userId: ${userId}, city: ${city}`);
    } catch (error) {
      console.error(`Error deleting badge from DynamoDB:`, error);
      throw new Error('Failed to delete badge');
    }
  };

  /**
   * Retrieve a badge from Dynamo by badgeId
   * 
   * @param {string} userId
   * @returns {Object|null}
   * 
   */

  export const getBadgeFromDynamoDB = async (params) => {
    
  }