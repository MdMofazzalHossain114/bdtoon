import { z } from "zod";
import { emailRegex, usernameValidation } from "./signUpSchema";

const identifierSchema = z
  .string()
  .min(3, "Username or email must be at least 3 characters")
  .max(50, "Identifier is too long")
  .refine(
    (val) => {
      const isEmail = emailRegex.test(val);
      const isUsername = usernameValidation.safeParse(val).success;
      return isEmail || isUsername;
    },
    {
      message: "Enter a valid username (up to 20 characters) or email address",
    }
  );

export const loginSchema = z.object({
  identifier: identifierSchema,
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, { message: "Password is too long" }),
});
