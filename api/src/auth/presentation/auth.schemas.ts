import { z } from "zod";

export const loginBodySchema = z.object({
  code: z.string().trim().min(1, "is required"),
  password: z.string().min(1, "is required"),
});

export const registerBodySchema = z.object({
  name: z.string().trim().min(1, "is required"),
  code: z.string().trim().min(1, "is required"),
  password: z.string().min(1, "is required"),
  passwordConfirmation: z.string().min(1, "is required"),
});
