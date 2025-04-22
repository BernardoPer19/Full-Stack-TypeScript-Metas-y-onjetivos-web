export interface AuthType {
  user_id: number;
  nombre: string;
  email: string;
  password: string;
  createAt: Date;
}

export type RegisterType = Pick<AuthType, "nombre" | "email" | "password">;
