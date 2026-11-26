import { RequestHandler } from 'express';
import { loginWithGoogle } from '../services/auth.service';

// Takes the Google token from the body and sends back our token and user
export const googleLogin: RequestHandler = async (request, response) => {
  const result = await loginWithGoogle(request.body.idToken);

  response.json(result);
};
