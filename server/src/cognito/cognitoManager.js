import { 
  CognitoIdentityProviderClient, 
  AdminGetUserCommand, 
  AdminUpdateUserAttributesCommand, 
  AdminCreateUserCommand, 
  ListUsersCommand 
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

/**
 * Create a user in Cognito and retrieve the `sub` (Cognito UserId).
 * 
 * @param {string} email - User's email retrieved from Spotify.
 * @param {Object} userAttributes - Additional attributes like SpotifyUserId, refreshToken.
 * @returns {string} - The Cognito `sub` (UserId).
 */
export const createUserInCognito = async (email, userAttributes) => {
  const createParams = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: email,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'custom:spotify_user_id', Value: userAttributes.spotifyUserId },
      { Name: 'custom:spotify_r_token', Value: userAttributes.refreshToken }  // Refresh token included
    ],
  };

  try {
    const result = await cognitoClient.send(new AdminCreateUserCommand(createParams));

    // The `sub` is part of the Username field in the response
    const cognitoSub = result.User?.Username;  // This is the Cognito `sub`

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
    const result = await cognitoClient.send(new AdminGetUserCommand(params));
    return result;  // Return the Cognito user data
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
 * @param {Object} attributes - The attributes to update (e.g., spotifyUserId, refreshToken, country, product).
 */
export const updateCognitoUser = async (userId, attributes) => {
  // Prepare the user attributes for updating in Cognito
  const userAttributes = [];

  // Add Spotify user ID to the attributes if provided
  if (attributes.spotifyUserId) {
    userAttributes.push({ Name: 'custom:spotify_user_id', Value: attributes.spotifyUserId });
  }

  // Add Spotify refresh token if provided
  if (attributes.refreshToken) {
    userAttributes.push({ Name: 'custom:spotify_r_token', Value: attributes.refreshToken });
  }

  // Add country and product if provided
  if (attributes.country) {
    userAttributes.push({ Name: 'custom:spotify_country', Value: attributes.country });
  }
  if (attributes.product) {
    userAttributes.push({ Name: 'custom:spotify_product', Value: attributes.product });
  }

  // If no attributes were provided, log and exit early (no update needed)
  if (userAttributes.length === 0) {
    console.log('No updates to apply');
    return;  // Exit the function if there are no updates
  }

  // Define the parameters for updating the Cognito user
  const updateParams = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: userId,  // Use the Cognito sub (userId) to identify the user
    UserAttributes: userAttributes,  // Pass the attributes that need updating
  };

  try {
    // Try to update the user in Cognito with the provided attributes
    await cognitoClient.send(new AdminUpdateUserAttributesCommand(updateParams));
    console.log(`Updated user ${userId} with attributes:`, userAttributes);
  } catch (error) {
    console.error(`Failed to update user in Cognito: ${error.message}`);
    throw new Error(`Failed to update user in Cognito: ${error.message}`);
  }
};
