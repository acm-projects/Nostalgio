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
   * @param {Object} userAttributes - Additional attributes for the user.
   * @returns {string} - The Cognito `sub` (UserId).
   */
  export const createUserInCognito = async (email, userAttributes) => {
    // Map attributes from the object to Cognito's expected format
    const formattedAttributes = Object.entries(userAttributes).map(([key, value]) => {
      return { Name: key, Value: value };  // No need to add 'custom:' if it's passed correctly in the object
    });
  
    // Include the email attribute explicitly
    formattedAttributes.push({ Name: 'email', Value: email });
  
    const createParams = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email,
      UserAttributes: formattedAttributes,
    };
  
    try {
      const result = await cognitoClient.send(new AdminCreateUserCommand(createParams));
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
   * @param {Object} userAttributes - The attributes to update (e.g., spotifyUserId, refreshToken, country, product).
   */
  export const updateCognitoUser = async (userId, userAttributes) => {
    // Map attributes from the object to Cognito's expected format
    const formattedAttributes = Object.entries(userAttributes).map(([key, value]) => {
      return { Name: key, Value: value };  // No need to add 'custom:' if the key already includes it
    });
  
    // If no attributes were provided, log and exit early (no update needed)
    if (formattedAttributes.length === 0) {
      console.log('No updates to apply');
      return;  // Exit the function if there are no updates
    }
  
    const updateParams = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: userId,  // Use the Cognito sub (userId) to identify the user
      UserAttributes: formattedAttributes,
    };
  
    try {
      await cognitoClient.send(new AdminUpdateUserAttributesCommand(updateParams));
      console.log(`Updated user ${userId} with attributes:`, formattedAttributes);
    } catch (error) {
      console.error(`Failed to update user in Cognito: ${error.message}`);
      throw new Error(`Failed to update user in Cognito: ${error.message}`);
    }
  };
  