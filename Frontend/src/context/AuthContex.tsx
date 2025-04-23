import React, { createContext } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContextProps, AuthProviderProps } from "../types/ContextType";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    isAuthenticate,
    loading,
    user,
    authError,
    registerUser,
    loginUser,
    logout,
    setIsAuthenticate,
  } = useAuth();

  const value = {
    isAuthenticate,
    loading,
    user,
    authError,
    registerUser,
    loginUser,
    logout,
    setIsAuthenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
