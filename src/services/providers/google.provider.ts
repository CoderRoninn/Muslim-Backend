import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { env } from '../../config/env';
import { AppError } from '../../errors/AppError';

// Checks Google tokens, created once and reused
const googleClient = new OAuth2Client();

// Takes the Google token from the app and tells who the user is
export const verifyGoogleToken = async (idToken: string) => {
  // Stops early when the client id is missing in the env file
  if (!env.googleClientId) {
    throw new Error('GOOGLE_CLIENT_ID is not set');
  }

  // Declared here so it can be used after the try block
  let ticket: LoginTicket;

  // The library throws its own error, so we turn it into ours
  try {
    ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.googleClientId,
    });
  } catch {
    throw new AppError('Invalid Google token', 401);
  }

  const payload = ticket.getPayload();

  if (!payload) {
    throw new AppError('Invalid Google token', 401);
  }

  // Only the data we need from the token
  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
  };
};
