import { z } from "zod";

export const profileSchema = z.object({
  displayName: z
    .string()
    .min(3, "Display name must be at least 3 characters")
    .max(20, "Display name must be at most 20 characters"),
  bio: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 500, {
      message: "Bio can’t be longer than 500 characters",
    }),
  profilePicture: z.any().optional(),
});
