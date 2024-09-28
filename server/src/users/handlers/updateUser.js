import { updateUserInDynamoDB } from '../userService.js';  // Correct path based on updated structure

export const updateUserHandler = async (event) => {
  const userId = event.pathParameters.userId;
  const updates = JSON.parse(event.body);

  // Check if updates are provided
  if (!updates || Object.keys(updates).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No updates provided' }),
    };
  }

  try {
    // Call the flexible `updateUserInDynamoDB` function, passing only the provided updates
    await updateUserInDynamoDB(userId, updates);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User updated successfully' }),
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update user', error: error.message }),
    };
  }
};
