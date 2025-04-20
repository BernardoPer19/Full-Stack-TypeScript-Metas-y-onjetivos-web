interface AuthType {
  user_id: number;
  name: string;
  email: string;
  password: string;
  crateAt: Date;
}

export type RegisterType = Pick<AuthType, "name" | "email" | "password">;
