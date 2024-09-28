import { createUserInCognito } from '../../cognito/cognitoManager.js';
import { storeUserInDynamoDB } from '../userService.js';

export const createUserHandler = async (event) => {
  const { email, spotifyUserId, country, product } = JSON.parse(event.body);
  
  try {
    // Create user in Cognito and get the sub
    const cognitoSub = await createUserInCognito(email, { spotifyUserId });

    // Store user in DynamoDB
    await storeUserInDynamoDB({
      UserId: cognitoSub,
      SpotifyUserId: spotifyUserId,
      Email: email,
      Country: country,
      SpotifyProduct: product,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User created successfully', cognitoSub }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create user', error: error.message }),
    };
  }
};