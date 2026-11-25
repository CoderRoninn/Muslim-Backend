import { app } from './app';

const port = 3000;

// Opens the door and starts listening for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
