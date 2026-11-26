import { SignJWT } from 'jose';
import { env } from '../config/env';

// Stops the server at start when the secret is missing in the env file
if (!env.jwtSecret) {
  throw new Error('JWT_SECRET is not set');
}

// jose wants the secret as bytes instead of text
const secret = new TextEncoder().encode(env.jwtSecret);

// Creates the token the app sends with every request
export const signToken = (userId: string) =>
  new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .sign(secret);
