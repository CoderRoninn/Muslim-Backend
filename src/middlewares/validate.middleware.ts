import { RequestHandler } from 'express';
import { ZodType } from 'zod';
import { AppError } from '../errors/AppError';

// Takes the rules and gives back a middleware that checks the body with them
export const validate = (schema: ZodType): RequestHandler => {
  return (request, response, next) => {
    // Checks the body and gives a result instead of throwing
    const result = schema.safeParse(request.body);

    // 400 Bad Request means the data the user sent is wrong so the user must fix it and try again
    if (!result.success) {
      throw new AppError('Invalid request data', 400);
    }

    // Keeps only the clean data that passed the rules
    request.body = result.data;

    // Data is fine so the request moves on to the controller
    next();
  };
};
