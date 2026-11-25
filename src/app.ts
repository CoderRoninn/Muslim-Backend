import express from 'express';

export const app = express();

// Tells that the server is alive
app.get('/health', (request, response) => {
  response.json({ status: 'ok' });
});
