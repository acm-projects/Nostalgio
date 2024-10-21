import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';

// Cloudinary configuration using separate environment variables for Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Cloudinary cloud name from environment variables
  api_key: process.env.CLOUDINARY_API_KEY,       // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret
});

const maxFileSizeKB = 256;

/**
 * Upload an image to Cloudinary and convert it to JPEG format.
 * 
 * @param {Buffer} imageBuffer - The image data in buffer form.
 * @param {string} originalFileName - The original file name of the image.
 * @returns {Promise<string>} - URL of the uploaded and converted JPEG image.
 */
export const uploadImageToCloudinary = async (imageBuffer, originalFileName) => {
  try {
    console.log(`Preparing to upload image to Cloudinary: ${originalFileName}`);
    console.log(`Initial image buffer size: ${(imageBuffer.length / 1024).toFixed(2)} KB`);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          format: 'jpg',
          public_id: originalFileName,
          overwrite: true,
          transformation: [
            { width: 800, crop: "limit" },
            { quality: "auto:low" },  // Automatically adjust quality
            { fetch_format: "jpg" },
          ],
        },
        async (error, result) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return reject(new Error('Failed to upload image to Cloudinary.'));
          }

          console.log(`Uploaded image size: ${(result.bytes / 1024).toFixed(2)} KB`);

          // If the image size exceeds 256 KB, retry with lower quality
          if (result.bytes > maxFileSizeKB * 1024) {
            console.log(`Image size exceeds 256 KB limit (${(result.bytes / 1024).toFixed(2)} KB). Retrying with lower quality...`);

            const lowerQualityResult = await cloudinary.uploader.upload_stream(
              {
                resource_type: 'image',
                format: 'jpg',
                public_id: originalFileName,
                overwrite: true,
                transformation: [
                  { width: 800, crop: "limit" },
                  { quality: "auto:eco" },  // Lower quality to reduce file size
                  { fetch_format: "jpg" },
                ],
              },
              (error, finalResult) => {
                if (error || !finalResult.secure_url) {
                  console.error('Error retrying image upload with lower quality:', error);
                  return reject(new Error('Failed to upload resized image to Cloudinary.'));
                }
                console.log(`Resized image size: ${(finalResult.bytes / 1024).toFixed(2)} KB`);

                if (finalResult.bytes > maxFileSizeKB * 1024) {
                  console.error(`Even after resizing, the image exceeds 256 KB (${(finalResult.bytes / 1024).toFixed(2)} KB).`);
                  return reject(new Error('Image size exceeds 256 KB limit after resizing.'));
                }

                console.log('Successfully uploaded resized image to Cloudinary:', finalResult.secure_url);
                resolve(finalResult.secure_url);
              }
            );
          } else {
            console.log('Successfully uploaded image to Cloudinary. URL:', result.secure_url);
            resolve(result.secure_url);  // Return the secure Cloudinary URL
          }
        }
      );

      // Pass the image buffer to the Cloudinary stream for upload
      uploadStream.end(imageBuffer);
    });
  } catch (error) {
    console.error('Error during Cloudinary image upload process:', error);
    throw new Error('Image upload to Cloudinary failed.');
  }
};

/**
 * Fetch an image from Cloudinary and convert it to base64 format.
 * This is used when Spotify requires the image in base64 for updating playlist images.
 * 
 * @param {string} imageUrl - The URL of the image on Cloudinary.
 * @returns {Promise<string>} - The base64-encoded image data (in JPEG format).
 */
export const fetchImageAsBase64 = async (imageUrl) => {
  try {
    console.log(`Fetching image from Cloudinary URL: ${imageUrl}`);

    // Fetch the image as binary data from Cloudinary
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    console.log('Image fetched successfully. Converting to base64 format...');
    // Convert binary data to base64 (JPEG)
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    console.log('Successfully converted image to Base64 format.');
    
    return base64Image;  // Return the base64-encoded image data
  } catch (error) {
    console.error('Error fetching or converting image from Cloudinary:', error);
    throw new Error('Failed to retrieve and convert image to Base64.');
  }
};
