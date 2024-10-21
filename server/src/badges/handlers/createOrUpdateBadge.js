import { storeOrUpdateBadgeInDynamoDB } from "../badgeService.js";
import { reverseGeocode } from "../../locations/handlers/reverseGeocode.js";

export const createOrUpdateBadgeHandler = async (event) => {
    const { userId, latitude, longitude, country} = JSON.parse(event.body);

    const currentTimestamp = new Date().toISOString();
    const city = await reverseGeocode({latitude, longitude});
    console.log(`City identified: ${city}`);

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

