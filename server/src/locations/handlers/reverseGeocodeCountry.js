import axios from 'axios';

// Load the Google API Key from environment variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

/**
 * Reverse geocode latitude and longitude into a country name.
 * 
 * @param {Object} coordinates - The coordinates object containing latitude and longitude.
 * @param {string} coordinates.latitude - The latitude coordinate.
 * @param {string} coordinates.longitude - The longitude coordinate.
 * @returns {Promise<string>} - A promise that resolves to the country name.
 * @throws {Error} - Throws an error if the country name cannot be retrieved.
 */
export const reverseGeocodeCountry = async ({ latitude, longitude }) => {
    if (!latitude || !longitude) {
        console.warn('Latitude or longitude is missing.');
        throw new Error('Latitude and longitude are required.');
    }

    console.log(`Initiating country reverse geocoding for latitude: ${latitude}, longitude: ${longitude}`);

    try {
        // Prepare the Google Maps Geocoding API request
        const url = 'https://maps.googleapis.com/maps/api/geocode/json';
        const params = {
            latlng: `${latitude},${longitude}`,
            key: GOOGLE_API_KEY,
        };

        // Execute the request to the Google Maps API
        const response = await axios.get(url, { params });

        // Extract the country name from the API response
        const country = response.data.results[0].address_components.find(component =>
            component.types.includes("country"))?.long_name;        

        if (!country) {
            console.error('No country found in the geocoding response.');
            throw new Error('Country not found for the given coordinates.');
        }

        console.log(`Reverse geocoding successful. Country: ${country}`);
        return country;
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
        throw new Error('Failed to retrieve country name');
    }
};

/**
 * Lambda handler for API Gateway to reverse geocode and respond with the country name.
 * This wrapper allows the function to be used both as a direct import and as a Lambda handler.
 * 
 * @param {Object} event - API Gateway event object containing query parameters.
 * @returns {Object} - HTTP response with the country name or error message.
 */
export const reverseGeocodeCountryHandler = async (event) => {
    const { latitude, longitude } = event.queryStringParameters || {};

    try {
        const country = await reverseGeocodeCountry({ latitude, longitude });
        return {
            statusCode: 200,
            body: JSON.stringify({ country }),
        };
    } catch (error) {
        return {
            statusCode: error.message.includes('Latitude and longitude are required') ? 400 : 500,
            body: JSON.stringify({
                message: error.message.includes('Country not found') ? 'Country not found for the given coordinates' : 'Failed to retrieve country name',
                error: error.message,
            }),
        };
    }
};
