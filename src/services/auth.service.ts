import { verifyGoogleToken } from './providers/google.provider';
import { signToken } from './token.service';

// Logs the user in with a Google token and gives back our own token
export const loginWithGoogle = async (idToken: string) => {
  // Asks Google who the user is
  const googleUser = await verifyGoogleToken(idToken);

  // No database yet so the user id is built from the Google id
  const userId = `google:${googleUser.googleId}`;

  // Creates our own token for this user
  const token = await signToken(userId);

  // The app gets our token and the user info
  return {
    token,
    user: {
      id: userId,
      email: googleUser.email,
      name: googleUser.name,
    },
  };
};
