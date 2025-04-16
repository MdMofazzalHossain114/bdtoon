export const verifySchema = z.object({
  email: z.string().email("Invalid email address"),

  code: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must be numeric"),
});
