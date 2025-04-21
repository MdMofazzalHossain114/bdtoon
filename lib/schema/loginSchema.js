import { z } from "zod";

// Username regex: no double underscores, no start/end underscore, only letters/numbers/underscores
const usernameRegex = /^(?!.*__)[a-zA-Z](?:[a-zA-Z0-9_]{1,18}[a-zA-Z0-9])?$/;

// Robust email regex
const emailRegex = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/;

const identifierSchema = z
  .string()
  .min(3, "Username or email must be at least 3 characters")
  .max(50, "Identifier is too long") // for email, as emails can be longer
  .refine((val) => usernameRegex.test(val) || emailRegex.test(val), {
    message: "Enter a valid username (up to 20 characters) or email address",
  });

export const loginSchema = z.object({
  identifier: identifierSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
});
