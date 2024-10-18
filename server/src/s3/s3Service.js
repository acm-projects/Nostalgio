import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import mime from 'mime-types'; // Import mime-types for dynamic file extension handling
import sharp from 'sharp'; // Import sharp for image processing

// Initialize the S3 client
const s3Client = new S3Client({ region: process.env.AWS_REGION });
const bucketName = process.env.S3_BUCKET_NAME;

/**
 * Converts an image buffer to JPEG format.
 * 
 * @param {Buffer} imageBuffer - The buffer containing the image data.
 * @param {string} contentType - The MIME type of the original image.
 * @returns {Promise<Buffer>} - The buffer of the converted JPEG image.
 */
export const convertToJpeg = async (imageBuffer, contentType) => {
  try {
    console.log(`Converting image from ${contentType} to JPEG format.`);

    // Use sharp to convert any image format to JPEG
    const convertedImageBuffer = await sharp(imageBuffer)
      .jpeg({ quality: 80 })  // Set JPEG quality (optional)
      .toBuffer();

    console.log('Image successfully converted to JPEG.');
    return convertedImageBuffer;
  } catch (error) {
    console.error('Error converting image to JPEG:', error);
    throw new Error('Image conversion to JPEG failed.');
  }
};

/**
 * Generates an S3 key for storing images based on the type, userId, and the original file name.
 * 
 * @param {string} type - The type of image ('profile', 'playlist', etc.).
 * @param {string} userId - The user ID associated with the image.
 * @param {string} id - The unique identifier for the specific content.
 * @param {string} originalFileName - The original name of the file being uploaded.
 * @returns {string} - The S3 key path for the image.
 */
const generateImageKey = (type, userId, id, originalFileName) => {
  const extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
  console.log(`Using extension from original file: ${extension}`);

  switch (type) {
    case 'profile':
      return `users/${userId}/profile/${userId}${extension}`;
    case 'playlist':
      return `users/${userId}/playlists/${id}${extension}`;
    default:
      throw new Error(`Unsupported image type: ${type}`);
  }
};

/**
 * Uploads an image to S3 with the provided file name and extension.
 * 
 * @param {string} type - The type of image ('profile', 'playlist', etc.).
 * @param {string} userId - The user ID associated with the image.
 * @param {Buffer} imageBuffer - The buffer containing the image data.
 * @param {string} contentType - The MIME type of the image (e.g., 'image/jpeg').
 * @param {string} id - The unique identifier for the specific content.
 * @param {string} originalFileName - The original name of the file being uploaded.
 * @returns {Promise<string>} - The S3 URL of the uploaded image.
 */
export const uploadImage = async (type, userId, imageBuffer, contentType, id, originalFileName) => {
  try {
    const key = generateImageKey(type, userId, id, originalFileName);
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: imageBuffer,
      ContentType: contentType,
    };

    console.log(`Attempting to upload image to S3 at path: ${key}`);
    await s3Client.send(new PutObjectCommand(params));
    
    const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    console.log(`Image successfully uploaded. Accessible at: ${imageUrl}`);
    return imageUrl;
  } catch (error) {
    console.error(`Error occurred during S3 upload: ${error.message}`);
    throw new Error('Failed to upload image');
  }
};

/**
 * Generates a presigned URL for accessing an image from S3.
 */
export const getImageUrl = async (type, userId, id, originalFileName) => {
  try {
    const key = generateImageKey(type, userId, id, originalFileName);
    
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    console.log(`Generating presigned URL for image at path: ${key}`);
    const url = await getSignedUrl(s3Client, new GetObjectCommand(params), { expiresIn: 3600 });
    
    console.log(`Presigned URL generated: ${url}`);
    return url;
  } catch (error) {
    console.error(`Error generating presigned URL: ${error.message}`);
    throw new Error('Failed to generate presigned URL');
  }
};

/**
 * Deletes an image from S3.
 */
export const deleteImage = async (type, userId, id, originalFileName) => {
  try {
    const key = generateImageKey(type, userId, id, originalFileName);
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    console.log(`Attempting to delete image from S3 at path: ${key}`);
    await s3Client.send(new DeleteObjectCommand(params));
    
    console.log(`Image successfully deleted from path: ${key}`);
  } catch (error) {
    console.error(`Error deleting image from S3: ${error.message}`);
    throw new Error('Failed to delete image');
  }
};
