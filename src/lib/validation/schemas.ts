import { z } from "zod";

export const userSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const deleteSchema = z.object({
  email: z.email("Invalid email address"),
})

export const registerSchema = userSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type User = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type DeleteInput = z.infer<typeof deleteSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
