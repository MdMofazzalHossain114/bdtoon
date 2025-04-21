import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username can not exceed 20 characters")
  .regex(
    /^(?!.*__)[a-zA-Z](?:[a-zA-Z0-9_]{1,18}[a-zA-Z0-9])?$/,
    "Username must start with a letter and can contain only letters, numbers, and underscores"
  );

const emailRegex = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/;

export const signUpSchema = z.object({
  username: usernameValidation,

  email: z.string().regex(emailRegex, "Invalid email format"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name cannot exceed 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces")
    .regex(/^\S/, "First name cannot start with a space")
    .regex(/\S$/, "First name cannot end with a space"),

  lastname: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name cannot exceed 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces")
    .regex(/^\S/, "Last name cannot start with a space")
    .regex(/\S$/, "Last name cannot end with a space"),
});
