import 'dotenv/config';

// Reads values from the env file so other files use them from here
export const env = {
  port: Number(process.env.PORT),
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  jwtSecret: process.env.JWT_SECRET,
};
