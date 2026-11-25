import { OAuth2Client } from 'google-auth-library';
import { env } from '../../config/env';

// Checks Google tokens, created once and reused
const googleClient = new OAuth2Client();

// Takes the Google token from the app and tells who the user is
export const verifyGoogleToken = async (idToken: string) => {
  // Stops early when the client id is missing in the env file
  if (!env.googleClientId) {
    throw new Error('GOOGLE_CLIENT_ID is not set');
  }

  // Throws an error when the token is invalid or made for another app
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.googleClientId,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('Google token has no payload');
  }

  // Only the data we need from the token
  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
  };
};
