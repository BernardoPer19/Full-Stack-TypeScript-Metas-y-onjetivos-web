import { ReactNode, SetStateAction } from "react";
import { LoginUserType, RegisterUserType, UserType } from "./AuthTypes";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  isAuthenticate: boolean;
  loading: boolean;
  user: UserType | null;
  authError: string | null;
  registerUser: (data: RegisterUserType) => Promise<void>;
  loginUser: (data: LoginUserType) => void;
  logout: () => void;
  setIsAuthenticate: (auth: boolean) => void;
}
