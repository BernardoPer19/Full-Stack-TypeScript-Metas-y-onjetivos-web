import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type RegisterUserType = z.infer<typeof registerSchema>;
export type LoginUserType = z.infer<typeof loginSchema>;
