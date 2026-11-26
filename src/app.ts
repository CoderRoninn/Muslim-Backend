import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { authRouter } from './routes/auth.routes';

export const app = express();

// Reads the json data sent by the app and puts it in request body
app.use(express.json());

// Tells that the server is alive
app.get('/health', (request, response) => {
  response.json({ status: 'ok' });
});

// All addresses that start with auth go to the auth routes
app.use('/auth', authRouter);

// Must stay after all routes so it can catch their errors
app.use(errorMiddleware);
