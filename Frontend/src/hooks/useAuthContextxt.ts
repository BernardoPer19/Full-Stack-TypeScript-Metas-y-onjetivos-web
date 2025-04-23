import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import { AuthContextProps } from "../types/ContextType";

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
