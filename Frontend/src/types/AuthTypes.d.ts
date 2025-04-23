export interface UserType {
  user_id: number;
  nombre: string;
  email: string;
  password: string;
  createAt: Date;
}

export type RegisterUserType = Pick<UserType, "nombre" | "email" | "password">;
export type LoginUserType = Pick<UserType, "email" | "password">;
