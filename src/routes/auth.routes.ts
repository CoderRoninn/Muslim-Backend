import { Router } from 'express';
import { googleLogin } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { authValidation } from '../validations/auth.validation';

// A small group of routes that all start with the same address
export const authRouter = Router();

// The body is checked first and then the controller runs
authRouter.post('/google', validate(authValidation.googleLogin), googleLogin);
