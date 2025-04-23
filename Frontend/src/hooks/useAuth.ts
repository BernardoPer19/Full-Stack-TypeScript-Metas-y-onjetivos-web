import { useState, useEffect } from "react";
import { LoginUserType, RegisterUserType, UserType } from "../types/AuthTypes";
import Cookies from "js-cookie";
import {
  loginUserRequest,
  RegisterRequest,
  verifyUserRequest,
  logoutRequest,
} from "../api/AuthReques";

const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [authError, setAuthError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authError.length > 0) {
      const timer = setTimeout(() => {
        setAuthError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  const registerUser = async (data: RegisterUserType): Promise<void> => {
    setLoading(true);
    try {
      const response = await RegisterRequest(data);

      if (response) {
        setUser(response);
        setIsAuthenticate(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError(
          "Hubo un problema al intentar registrarse. Intenta nuevamente."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data: LoginUserType): Promise<void> => {
    setLoading(true);
    try {
      const response = await loginUserRequest(data);
      if (response) {
        setUser(response);
        setIsAuthenticate(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("Hubo un problema al intentar iniciar sesión.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setIsAuthenticate(false);
    Cookies.remove("access_token");
  };

  const verifyUser = async () => {
    const token = Cookies.get("access_token");
    if (token) {
      try {
        const response = await verifyUserRequest();
        setUser(response);
        setIsAuthenticate(true);
      } catch (error) {
        setAuthError("Token inválido o expirado.");
        setIsAuthenticate(false);
        setUser(null);
      }
    }
  };

  return {
    user,
    isAuthenticate,
    authError,
    loading,
    registerUser,
    loginUser,
    setUser,
    logout,
    verifyUser,
    setLoading,
    setIsAuthenticate,
  };
};

export default useAuth;
