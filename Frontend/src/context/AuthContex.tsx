import React, { createContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContextProps, AuthProviderProps } from "../types/ContextType";
import { verifyUserRequest } from "../api/AuthReques";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    isAuthenticate,
    setIsAuthenticate,
    loading,
    setLoading,
    user,
    setUser,
    authError,
    registerUser,
    loginUser,
    logout,
  } = useAuth();

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      try {
        const userData = await verifyUserRequest();
        setIsAuthenticate(true);
        setUser(userData);
      } catch (error) {
        setIsAuthenticate(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  const value = {
    isAuthenticate,
    setIsAuthenticate,
    loading,
    setLoading,
    user,
    setUser,
    authError,
    registerUser,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
