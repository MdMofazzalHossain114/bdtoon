import { z } from "zod";

// Username regex: no double underscores, no start/end underscore, only letters/numbers/underscores
const usernameRegex = /^(?!.*__)[a-zA-Z0-9](?:[a-zA-Z0-9_]{1,18}[a-zA-Z0-9])?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const identifierSchema = z
  .string()
  .min(3, "Username or email must be at least 3 characters")
  .max(50, "Identifier is too long") // set a reasonable cap for emails
  .refine((val) => usernameRegex.test(val) || emailRegex.test(val), {
    message: "Enter a valid username (up to 20 characters) or email address",
  });

export const loginSchema = z.object({
  identifier: identifierSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
});
