import * as z from "zod";

export const userRegistrationFormSchema = z.object({
  email: z.email("Please enter valid email"),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(20, { error: "Password must not exceed 20 characters" })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character",
    }),
});

export const haikuFormSchema = z.object({
  line1: z
    .string({ error: "Line 1 is required" })
    .min(3, { error: "Line 1 must be at least 3 characters long" })
    .max(20, { error: "Line 1 must not exceed 20 characters" }),
  line2: z
    .string({ error: "Line 2 is required" })
    .min(6, { error: "Line 2 must be at least 6 characters long" })
    .max(30, { error: "Line 2 must not exceed 30 characters" }),
  line3: z
    .string({ error: "Line 3 is required" })
    .min(9, { error: "Line 3 must be at least 9 characters long" })
    .max(40, { error: "Line 3 must not exceed 40 characters" }),
  // author: z.string().optional(),
});
