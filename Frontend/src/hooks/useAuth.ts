import { useState, useEffect } from "react";
import { LoginUserType, RegisterUserType, UserType } from "../types/AuthTypes";
import Cookies from "js-cookie";
import { loginUserRequest, RegisterRequest } from "../api/AuthReques";

const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const token = Cookies.get("access_token");
  //   if (token) {
  //     setIsAuthenticate(true);
  //   }
  // }, []);

  const registerUser = async (data: RegisterUserType): Promise<void> => {
    setLoading(true);
    try {
      console.log(data);
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

  const logout = () => {
    setUser(null);
    setIsAuthenticate(false);
    Cookies.remove("access_token");
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = Cookies.get("access_token");
      if (token) {
        try {
          await verifyUser();
          setIsAuthenticate(true);
        } catch (error) {
          setAuthError("Token inválido o expirado.");
          setIsAuthenticate(false);
        }
      } else {
        setIsAuthenticate(false); // Si no hay token, no está autenticado
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  return {
    user,
    isAuthenticate,
    authError,
    loading,
    registerUser,
    loginUser,
    logout,
    setIsAuthenticate,
  };
};

export default useAuth;
