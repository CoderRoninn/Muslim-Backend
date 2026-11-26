import { z } from 'zod';

// Rules for the data that comes with auth requests
export const authValidation = {
  googleLogin: z.object({
    idToken: z.string().min(1),
  }),
};
