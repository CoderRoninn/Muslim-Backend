import { app } from './app';
import { env } from './config/env';

// Opens the door and starts listening for requests
app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
