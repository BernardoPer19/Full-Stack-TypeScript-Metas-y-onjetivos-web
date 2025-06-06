import axios from "../api/axios";
import { LoginUserType, RegisterUserType, UserType } from "../types/AuthTypes";
import { AxiosError } from "axios";

export const RegisterRequest = async (
  data: RegisterUserType
): Promise<UserType> => {
  try {
    const response = await axios.post<UserType>("/register", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el usuario.");
  }
};

export const loginUserRequest = async (
  data: LoginUserType
): Promise<UserType> => {
  try {
    const response = await axios.post("/login", data);
    return response.data;
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.message || error.message;
      throw new Error(backendMessage);
    }

    throw new Error("Error desconocido al iniciar sesion.");
  }
};

export const logoutRequest = async () => {
  try {
    const response = await axios.get("/logout");
    return response.data;
  } catch (error) {
    console.log("Error en logout:", error);
  }
};

export const verifyUserRequest = async (): Promise<UserType> => {
  try {
    const response = await axios.get("/verify");
    return response.data.user;
  } catch (error) {
    throw new Error("No autorizado. Inicia sesión.");
  }
};
