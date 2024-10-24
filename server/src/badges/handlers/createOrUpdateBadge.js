import { storeOrUpdateBadgeInDynamoDB } from "../badgeService.js";
import { reverseGeocode } from "../../locations/handlers/reverseGeocode.js";
import { reverseGeocodeCountry } from "../../locations/handlers/reverseGeocodeCountry.js";

export const createOrUpdateBadgeHandler = async (event) => {
    const { userId, latitude, longitude} = JSON.parse(event.body);

    const currentTimestamp = new Date().toISOString();
    const city = await reverseGeocode({latitude, longitude});
    const country = await reverseGeocodeCountry({latitude, longitude});
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
            body: JSON.stringify({message: 'Badge created or modified successfully'}),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Failed to create or modify badge', error: error.message}),
        };
    }
}

