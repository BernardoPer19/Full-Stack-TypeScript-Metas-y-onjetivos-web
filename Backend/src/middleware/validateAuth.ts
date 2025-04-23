// src/middlewares/validateAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_PASSWORD } from "../config";
import { AuthType } from "../types/AuthTypes";

export const validateAuth = (
  req: Request & { user?: AuthType },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    
    if (!token) {
      return res.status(401).json({ message: "Token no encontrado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET_PASSWORD) as AuthType;

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al verificar el token:", error.message);
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
  }
};
