import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';

export const app = express();

// Tells that the server is alive
app.get('/health', (request, response) => {
  response.json({ status: 'ok' });
});

// Must stay after all routes so it can catch their errors
app.use(errorMiddleware);
