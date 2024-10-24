import { getBadgeFromDynamoDB } from "../badgeService.js";

export const getBadgeHandler = async (event) => {
    console.log("Received event:", JSON.stringify(event));
    const {userId, city} = event.pathParameters;

    try {
        const badge = await getBadgeFromDynamoDB(userId, city);
        
        return {
            statusCode: 200,
            body: JSON.stringify(badge),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Failed to retrieve badge', error: error.message}),
        };
    }
    
};