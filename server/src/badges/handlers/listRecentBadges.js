import { listRecentBadgesFromDynamoDB } from "../badgeService.js";

export const listRecentBadgesHandler = async (event) => {
    console.log("Received event:", JSON.stringify(event));
    const {userId} = event.pathParameters;

    try {
        const recentBadges = await listRecentBadgesFromDynamoDB(userId);
        
        return {
            statusCode: 200,
            body: JSON.stringify(recentBadges),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Failed to list recent badges', error: error.message}),
        };
    }
    
};
