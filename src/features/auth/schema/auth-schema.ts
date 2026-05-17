import { z } from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .regex(/(?=.*\d)/, 'Password must contain at least one number')
        .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
});

export type SignInFormType = z.infer<typeof signInSchema>;