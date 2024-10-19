import { deleteBadgeFromDynamoDB } from "../badgeService.js";

export const deleteBadgeHandler = async (event) => {
    const {userId, city} = event.pathParameters;

    try {
        await deleteBadgeFromDynamoDB(userId, city)
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Badge deleted successfully' }),
        };


    }catch (error){
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to delete badge', error: error.message}),
        };
    }
    
};

