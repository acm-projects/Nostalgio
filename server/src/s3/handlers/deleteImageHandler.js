import { deleteImage } from '../s3Service.js';

/**
 * Lambda handler to delete an image from S3.
 * 
 * @param {Object} event - The API Gateway event containing the request details.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.userId - The user ID associated with the image.
 * @param {string} event.pathParameters.type - The type of image ('profile', 'playlist', etc.).
 * @param {string} event.pathParameters.id - The unique identifier for the specific content, like a playlist ID.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const deleteImageHandler = async (event) => {
  const { userId, type, id } = event.pathParameters;

  // Validate required parameters
  if (!userId || !type || !id) {
    console.warn('Missing required parameters for image deletion.');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'userId, type, and id are required to delete an image.' }),
    };
  }

  try {
    // Attempt to delete the image from S3
    console.log(`Deleting image for userId: ${userId}, type: ${type}, id: ${id}`);
    await deleteImage(type, userId, id);
    console.log(`Image successfully deleted for userId: ${userId}, type: ${type}, id: ${id}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Image successfully deleted.' }),
    };
  } catch (error) {
    console.error('Error deleting image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete image', error: error.message }),
    };
  }
};
