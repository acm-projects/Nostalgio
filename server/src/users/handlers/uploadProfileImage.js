import { uploadImage } from '../../s3/s3Service.js';
import { updateUserCustomProfileImage } from '../userService.js';

/**
 * Handler to upload a custom profile image for a user and update the UsersTable with the image URL.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters and image data.
 * @returns {Object} - HTTP response indicating success or failure.
 */
export const uploadProfileImageHandler = async (event) => {
  const { userId } = event.pathParameters;
  const contentType = event.headers['Content-Type'];
  const originalFileName = event.headers['X-Original-File-Name']; // Ensure this header includes the original file name
  
  // Convert base64 encoded body to Buffer
  const imageBuffer = Buffer.from(event.body, 'base64');

  // Validate required inputs
  if (!userId || !contentType || !event.body || !originalFileName) {
    console.warn('Missing required parameters for profile image upload');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'userId, Content-Type, originalFileName, and image body are required.' }),
    };
  }

  try {
    console.log(`Uploading custom profile image for user: ${userId}`);

    // Step 1: Upload the image to S3
    const customProfileImageUrl = await uploadImage('profile', userId, imageBuffer, contentType, userId, originalFileName);

    // Step 2: Update UsersTable with the custom profile image URL
    await updateUserCustomProfileImage(userId, customProfileImageUrl);

    console.log(`Custom profile image uploaded and URL updated successfully for user: ${userId}`);

    // Return success response with the image URL
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Custom profile image uploaded successfully',
        customProfileImageUrl,
      }),
    };
  } catch (error) {
    console.error(`Error uploading custom profile image for user ${userId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to upload custom profile image', error: error.message }),
    };
  }
};
