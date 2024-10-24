import axios from 'axios';

// Load the Google API Key from environment variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

/**
 * Reverse geocode latitude and longitude into a city name.
 * 
 * @param {Object} coordinates - The coordinates object containing latitude and longitude.
 * @param {string} coordinates.latitude - The latitude coordinate.
 * @param {string} coordinates.longitude - The longitude coordinate.
 * @returns {Promise<string>} - A promise that resolves to the city name.
 * @throws {Error} - Throws an error if the city name cannot be retrieved.
 */
export const reverseGeocode = async ({ latitude, longitude }) => {
    if (!latitude || !longitude) {
        console.warn('Latitude or longitude is missing.');
        throw new Error('Latitude and longitude are required.');
    }

    console.log(`Initiating reverse geocoding for latitude: ${latitude}, longitude: ${longitude}`);

    try {
        // Prepare the Google Maps Geocoding API request
        const url = 'https://maps.googleapis.com/maps/api/geocode/json';
        const params = {
            latlng: `${latitude},${longitude}`,
            key: GOOGLE_API_KEY,
        };

        // Execute the request to the Google Maps API
        const response = await axios.get(url, { params });

        // Extract the city name from the API response
        const city = response.data.results[0].address_components.find(component =>
            component.types.includes("locality"))?.long_name;

        if (!city) {
            console.error('No city found in the geocoding response.');
            throw new Error('City not found for the given coordinates.');
        }

        console.log(`Reverse geocoding successful. City: ${city}`);
        return city;
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
        throw new Error('Failed to retrieve city name');
    }
};

/**
 * Lambda handler for API Gateway to reverse geocode and respond with the city name.
 * This wrapper allows the function to be used both as a direct import and as a Lambda handler.
 * 
 * @param {Object} event - API Gateway event object containing query parameters.
 * @returns {Object} - HTTP response with the city name or error message.
 */
export const reverseGeocodeHandler = async (event) => {
    const { latitude, longitude } = event.queryStringParameters || {};

    try {
        const city = await reverseGeocode({ latitude, longitude });
        return {
            statusCode: 200,
            body: JSON.stringify({ city }),
        };
    } catch (error) {
        return {
            statusCode: error.message.includes('Latitude and longitude are required') ? 400 : 500,
            body: JSON.stringify({
                message: error.message.includes('City not found') ? 'City not found for the given coordinates' : 'Failed to retrieve city name',
                error: error.message,
            }),
        };
    }
};
