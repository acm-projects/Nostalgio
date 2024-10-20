import { storeOrUpdateBadgeInDynamoDB } from "../badgeService.js";

export const createOrUpdateBadgeHandler = async (event) => {
    const { userId, city, country} = JSON.parse(event.body);

    const currentTimestamp = new Date().toISOString();

    try{
        await storeOrUpdateBadgeInDynamoDB({
            userId: userId,
            city:city,
            lastVisitedDate: currentTimestamp,
            country:country,
            
        });

        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Badge modified successfully'}),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Failed to modify badge', error: error.message}),
        };
    }
}

