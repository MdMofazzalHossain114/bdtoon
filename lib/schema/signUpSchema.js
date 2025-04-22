import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username cannot exceed 20 characters")
  .regex(/^[a-zA-Z]/, "Username must start with a letter")
  .refine(
    (val) => /^[a-zA-Z0-9.]+$/.test(val),
    "Username can only contain letters, numbers, and dots"
  )
  .refine((val) => !/\.\./.test(val), "Username cannot contain double dots")
  .refine(
    (val) => /^[a-zA-Z0-9]$/.test(val[val.length - 1]),
    "Username must end with a letter or number"
  );

const emailRegex = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/;

export const signUpSchema = z
  .object({
    username: usernameValidation,

    email: z.string().regex(emailRegex, "Invalid email format"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Confirm your password"),

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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
