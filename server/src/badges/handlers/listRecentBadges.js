import { listRecentBadgesFromDynamoDB } from "../badgeService.js";

export const listRecentBadgesHandler = async (event) => {
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

const event = {
    pathParameters: {
        userId: "12345",  // Replace with the actual userId you want to test
    },
};

// Call the handler function
listRecentBadgesHandler(event).then((response) => {
    console.log('Lambda Response:', response);
}).catch((error) => {
    console.error('Error:', error);
});