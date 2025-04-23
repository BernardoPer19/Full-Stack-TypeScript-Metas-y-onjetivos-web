import { Router } from "express";
import {
  loginUser,
  logout,
  protectedRoute,
  registerUser,
  verify,
} from "../controllers/auth.controller";
import { validateAuth } from "../middleware/validateAuth";

export const AuthRoute = Router();

AuthRoute.post("/register", registerUser);
AuthRoute.post("/login", loginUser);
AuthRoute.post("/logout", logout);
AuthRoute.get("/protected", validateAuth, protectedRoute);
  AuthRoute.get("/verify", validateAuth, verify);
