import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET;

// Stops the server at start when the secret is missing or too short
if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters');
}

// Reads values from the env file so other files use them from here
export const env = {
  // Falls back to 3000 when PORT is missing or empty
  port: Number(process.env.PORT) || 3000,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  jwtSecret,
};
