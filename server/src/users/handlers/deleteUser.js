import { deleteUserFromDynamoDB } from '../userService.js';

export const deleteUserHandler = async (event) => {
  const userId = event.pathParameters.userId;

  try {
    await deleteUserFromDynamoDB(userId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User deleted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete user', error: error.message }),
    };
  }
};
