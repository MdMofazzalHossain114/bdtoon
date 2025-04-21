import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username can not exceed 20 characters")
  .regex(
    /^(?!.*--)[a-zA-Z0-9.-](?:[a-zA-Z0-9.-]{1,14}[a-zA-Z0-9])?$/,
    "Username must start with a letter and can contain only letters, numbers, and underscores"
  );

export const signUpSchema = z.object({
  username: usernameValidation,

  email: z.string().email({ message: "Invalid email address" }),

  password: z.string().min(6, "Password must be at least 6 characters"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name cannot exceed 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name cannot exceed 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
});
