// src/middlewares/validateAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_PASSWORD } from "../config";

// Importa el tipo AuthType
import { AuthType } from "../types/AuthTypes";

// Middleware para validar el token JWT
export const validateAuth = (
  req: Request & { user?: AuthType }, // Aquí agregas el tipo de `user`
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    console.log("token", token);

    if (!token) {
      return res.status(401).json({ message: "Token no encontrado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET_PASSWORD) as AuthType;
    console.log(decoded);
    
    req.user = decoded; // Esto ahora se puede hacer sin errores de tipo
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al verificar el token:", error.message);
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
  }
};
