import { gaxios, LoginTicket, OAuth2Client } from 'google-auth-library';
import { env } from '../../config/env';
import { AppError } from '../../errors/AppError';

// Checks Google tokens and is created once then reused
const googleClient = new OAuth2Client();

// Takes the Google token from the app and tells who the user is
export const verifyGoogleToken = async (idToken: string) => {
  // Stops early when the client id is missing in the env file
  if (!env.googleClientId) {
    throw new Error('GOOGLE_CLIENT_ID is not set');
  }

  // Declared here so it can be used after the try block
  let ticket: LoginTicket;

  // The library throws its own error so we turn it into ours
  try {
    ticket = await googleClient.verifyIdToken({
      idToken,
      audience: env.googleClientId,
    });
  } catch (error) {
    // Google could not be reached so it is not the fault of the user
    if (error instanceof gaxios.GaxiosError) {
      console.error('Google certificate request failed', error);

      // 503 Service Unavailable means the server cannot answer right now so try again later
      throw new AppError('Authentication service unavailable', 503);
    }

    // 401 Unauthorized means the token is invalid so the user must log in again
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
