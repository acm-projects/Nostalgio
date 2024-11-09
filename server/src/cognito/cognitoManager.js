import { 
  CognitoIdentityProviderClient, 
  AdminGetUserCommand, 
  AdminUpdateUserAttributesCommand, 
  AdminCreateUserCommand 
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

/**
 * Create a user in Cognito and retrieve the `sub` (Cognito UserId).
 * 
 * @param {string} email - User's email retrieved from Spotify.
 * @param {Object} userAttributes - Additional attributes like SpotifyUserId, refreshToken, displayName, and profile image.
 * @returns {string} - The Cognito `sub` (UserId).
 */
export const createUserInCognito = async (email, userAttributes) => {
  // Define user attributes for Cognito; add Spotify image URL only if provided
  const createParams = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'custom:spotify_user_id', Value: userAttributes.spotifyUserId },
      { Name: 'custom:spotify_r_token', Value: userAttributes.refreshToken },
      { Name: 'custom:display_name', Value: userAttributes.displayName },
    ],
  };

  // Conditionally add Spotify profile image if available
  if (userAttributes.spotifyImage) {
    createParams.UserAttributes.push({ Name: 'custom:spotify_image', Value: userAttributes.spotifyImage });
  }

  try {
    // Attempt to create the user in Cognito
    const result = await cognitoClient.send(new AdminCreateUserCommand(createParams));
    const cognitoSub = result.User?.Username;  // Get the Cognito user ID (sub)

    console.log(`User created in Cognito with sub: ${cognitoSub}`);
    return cognitoSub;
  } catch (error) {
    console.error('Error creating user in Cognito:', error);
    throw new Error('Failed to create user in Cognito');
  }
};

/**
 * Get a user from Cognito by email.
 * 
 * @param {string} email - The user's email.
 * @returns {Object|null} - The Cognito user or null if not found.
 */
export const getUserFromCognito = async (email) => {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
  };

  try {
    // Fetch user data from Cognito
    const result = await cognitoClient.send(new AdminGetUserCommand(params));
    console.log(`Retrieved user with email: ${email}`);
    return result;
  } catch (error) {
    if (error.name === 'UserNotFoundException') {
      console.log(`User not found in Cognito with email: ${email}`);
      return null;
    }
    console.error('Error fetching user from Cognito:', error);
    throw error;
  }
};

/**
 * Update a Cognito user with Spotify-related details.
 * This function updates an existing user with the provided attributes.
 * 
 * @param {string} userId - The Cognito `sub` (UserId).
 * @param {Object} attributes - The attributes to update (e.g., spotifyUserId, refreshToken, country, product, displayName, spotifyImage).
 */
export const updateCognitoUser = async (userId, attributes) => {
  const userAttributes = [];

  // Conditionally add each attribute to the update list if provided
  if (attributes.spotifyUserId) {
    userAttributes.push({ Name: 'custom:spotify_user_id', Value: attributes.spotifyUserId });
  }
  if (attributes.refreshToken) {
    userAttributes.push({ Name: 'custom:spotify_r_token', Value: attributes.refreshToken });
  }
  if (attributes.country) {
    userAttributes.push({ Name: 'custom:spotify_country', Value: attributes.country });
  }
  if (attributes.product) {
    userAttributes.push({ Name: 'custom:spotify_product', Value: attributes.product });
  }
  if (attributes.displayName) {
    userAttributes.push({ Name: 'custom:display_name', Value: attributes.displayName });
  }
  if (attributes.spotifyImage) {
    userAttributes.push({ Name: 'custom:spotify_image', Value: attributes.spotifyImage });
  }

  // If no attributes are provided, log and exit early
  if (userAttributes.length === 0) {
    console.log(`No attributes provided to update for userId: ${userId}`);
    return;
  }

  // Define parameters for the update operation
  const updateParams = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: userId,
    UserAttributes: userAttributes,
  };

  try {
    // Execute the update
    await cognitoClient.send(new AdminUpdateUserAttributesCommand(updateParams));
    console.log(`Updated user ${userId} with attributes:`, userAttributes);
  } catch (error) {
    console.error(`Failed to update user in Cognito: ${error.message}`);
    throw new Error(`Failed to update user in Cognito: ${error.message}`);
  }
};
