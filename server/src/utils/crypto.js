import crypto from 'crypto';

// Helper function to generate a code verifier (random string)
export const generateCodeVerifier = () => {
  return crypto.randomBytes(32).toString('hex');  // Generate a random 32-byte string as hex
};

// Helper function to generate a code challenge (SHA-256 hash of the code verifier)
export const generateCodeChallenge = (verifier) => {
  return crypto.createHash('sha256')
    .update(verifier)
    .digest('base64url');  // Use base64url encoding for the code challenge
};
