import { getImageUrl } from '../s3Service.js';

/**
 * Lambda handler to get an image URL from S3.
 * 
 * @param {Object} event - The API Gateway event containing the request details.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.userId - The user ID associated with the image.
 * @param {string} event.pathParameters.type - The type of image ('profile', 'playlist', etc.).
 * @param {string} event.pathParameters.id - The unique identifier for the specific content, like a playlist ID.
 * @returns {Object} - HTTP response with the presigned URL or error message.
 */
export const getImageHandler = async (event) => {
  const { userId, type, id } = event.pathParameters;

  // Validate required parameters
  if (!userId || !type || !id) {
    console.warn('Missing required parameters for image retrieval.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'userId, type, and id are required to retrieve an image.' }),
    };
  }

  try {
    // Retrieve the presigned URL for the image
    console.log(`Retrieving image URL for userId: ${userId}, type: ${type}, id: ${id}`);
    const imageUrl = await getImageUrl(type, userId, id);
    console.log(`Presigned URL retrieved for userId: ${userId}, type: ${type}, id: ${id}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Image URL retrieved successfully', imageUrl }),
    };
  } catch (error) {
    console.error('Error retrieving image URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve image URL', error: error.message }),
    };
  }
};
