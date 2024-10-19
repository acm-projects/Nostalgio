import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient} from "@aws-sdk/client-dynamodb";
import dotenv from 'dotenv';

const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);
dotenv.config();
/**
 * Store a new badge in DynamoDB BadgesTable.
 * 
 *  @param {Object} badgeData - the badge that is stored in DynamoDB
 *  @param {string} badgeData.UserId - partition key
 *  @param {string} badgeData.city - sort key
 *  @param {string} badgeData.country
 *  @param {string} badgeData.lastVisitedDate - GSI sort key 
 *  visitCount attribute is either incremented or starts at 1 when new item created.
 * 
 */

export const storeOrUpdateBadgeInDynamoDB = async (badgeData) => {
    try {
        //Query DynamoDB to check if badge for UserId and City exists
        const queryParams = {
            TableName: process.env.BADGES_TABLE,  // Main table name
            KeyConditionExpression: 'UserId = :UserId AND city = :city',
            ExpressionAttributeValues: {
                ':UserId': badgeData.UserId,
                ':city': badgeData.city,
            },
        };

        const existingBadge = await dynamoDb.send(new QueryCommand(queryParams));
        if(existingBadge.Items && existingBadge.Items.length > 0) {

            
            
            
            const updateParams = {
                TableName: process.env.BADGES_TABLE,
                Key: {
                    UserId: badgeData.UserId,
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
            console.log(`Badge updated for UserId: ${badgeData.UserId}, city: ${badgeData.city}, country: ${badgeData.country}`);
        }
        else {
       
        
            const params = {
                TableName: process.env.BADGES_TABLE,
                Item: {
                    UserId: badgeData.UserId,
                    lastVisitedDate: badgeData.lastVisitedDate,
                    city: badgeData.city,
                    country: badgeData.country,
                    visitCount: 1,
        
                },
            };
        
            
                await dynamoDb.send(new PutCommand(params));
                console.log(`Badge stored in BADGES_TABLE for UserId: ${badgeData.UserId}`);
        }  
            
        } catch (error) {
            console.error(`Error storing or updating badge` , error);
            throw new Error('Failed to store badge');

        }
}

/**
 *   @param {string} UserId - partition key to find most recent trips
 *   
 */

export const listRecentBadgesFromDynamoDB = async (UserId) => {
    const params = {
        TableName: process.env.BADGES_TABLE,
        IndexName: 'UserId-lastVisitedDate-index',
        KeyConditionExpression: 'UserId = :UserId',
        ExpressionAttributeValues: {
            ':UserId' : UserId
        },
        Limit: 10,
        ScanIndexForward: false
    };

    try {
        const result = await dynamoDbClient.send(new QueryCommand(params));
        if (result.Items) {
            console.log(`Retrieved recent ${result.Items.length} badges for UserId: ${UserId}`);
            return result.Items;
        }
        else{
            console.log(`No badges found for UserId: ${UserId}`);
            return [];
        }
    } catch(error) {
        console.error('Error fetching recent badges:', error);
        throw new Error('Failed to fetch recent badges');
    }


};

/**
 * Delete a badge from Badges .
 * 
 * @param {string} UserId - The Cognito `sub` (UserId).
 * @param {string} city - city visited.
 */
export const deleteBadgeFromDynamoDB = async (UserId, city) => {
    const params = {
      TableName: process.env.BADGES_TABLE,
      Key: {
        UserId: UserId,
        city: city,
      },
    };
  
    try {
      await dynamoDb.send(new DeleteCommand(params));
      console.log(`Badge deleted from DynamoDB for UserId: ${UserId}, city: ${city}`);
    } catch (error) {
      console.error(`Error deleting badge from DynamoDB:`, error);
      throw new Error('Failed to delete badge');
    }
  };

  /**
   * 
   * @param {string} UserId
   * @param {Object} 
   */

  export const getBadgeFromDynamoDB = async (params) => {
    
  }