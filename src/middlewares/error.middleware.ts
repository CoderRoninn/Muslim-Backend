import { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError';

// Catches every thrown error and sends the response
export const errorMiddleware: ErrorRequestHandler = (
  error,
  request,
  response,
  next,
) => {
  // Our own errors carry the message and status code we gave them
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  // Unknown errors are only logged, the user gets a general message
  console.error(error);
  response.status(500).json({ message: 'Something went wrong' });
};
