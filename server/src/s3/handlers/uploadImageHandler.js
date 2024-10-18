import { uploadImage } from '../s3Service.js';

/**
 * Lambda handler to upload an image to S3.
 * 
 * @param {Object} event - The API Gateway event containing the request details.
 * @param {Object} event.pathParameters - Path parameters from the request.
 * @param {string} event.pathParameters.userId - The user ID associated with the image.
 * @param {string} event.pathParameters.type - The type of image ('profile', 'playlist', etc.).
 * @param {string} event.pathParameters.id - The unique identifier for the specific content, like a playlist ID.
 * @param {string} event.headers['Content-Type'] - The MIME type of the image.
 * @param {string} event.body - The base64-encoded image data.
 * @param {string} event.headers['X-Original-File-Name'] - The original file name of the uploaded image.
 * @returns {Object} - HTTP response with the S3 URL or error message.
 */
export const uploadImageHandler = async (event) => {
  const { userId, type, id } = event.pathParameters;
  const contentType = event.headers['Content-Type'];
  const originalFileName = event.headers['X-Original-File-Name']; // Extract original file name from headers

  // Validate required parameters
  if (!userId || !type || !id || !contentType || !event.body || !originalFileName) {
    console.warn('Missing required parameters for image upload.');
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'userId, type, id, contentType, original file name, and image data are required.',
      }),
    };
  }

  // Validate content type
  const supportedContentTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/heic'];
  if (!supportedContentTypes.includes(contentType)) {
    console.warn(`Unsupported Content-Type: ${contentType}`);
    return {
      statusCode: 415, // Unsupported Media Type
      body: JSON.stringify({ message: `Unsupported Content-Type: ${contentType}` }),
    };
  }

  try {
    // Decode the base64 image data
    const imageBuffer = Buffer.from(event.body, 'base64');
    console.log(
      `Decoded image for type: ${type}, userId: ${userId}, id: ${id}, originalFileName: ${originalFileName}`
    );

    // Validate image size before processing
    const maxFileSize = 5 * 1024 * 1024; // 5MB limit
    if (imageBuffer.length > maxFileSize) {
      console.warn(`Image exceeds size limit. Size: ${imageBuffer.length} bytes`);
      return {
        statusCode: 413, // Payload Too Large
        body: JSON.stringify({ message: 'Image size exceeds the 5MB limit.' }),
      };
    }

    // Upload the image to S3, including original file name for proper key generation
    const imageUrl = await uploadImage(type, userId, imageBuffer, contentType, id, originalFileName);
    console.log(`Image uploaded successfully. URL: ${imageUrl}`);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Image uploaded successfully', imageUrl }),
    };
  } catch (error) {
    console.error('Error uploading image:', error);

    if (error.message.includes('Unsupported content type')) {
      return {
        statusCode: 415,
        body: JSON.stringify({ message: 'Unsupported image format' }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to upload image', error: error.message }),
    };
  }
};
