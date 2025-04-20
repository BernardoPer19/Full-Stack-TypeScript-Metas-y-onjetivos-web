import { Router } from "express";
import {
  loginUser,
  protectedRoute,
  registerUser,
} from "../controllers/auth.controller";
import { validateAuth } from "../middleware/validateAuth";

export const AuthRoute = Router();

// Route for user registration
AuthRoute.post("/register", registerUser);

// Route for user login
AuthRoute.post("/login", loginUser);

// // Route for user logout
// router.post("/logout", (req, res) => {
//   res.status(200).json({ message: "User logged out successfully" });
// });

// Protected route example
AuthRoute.get("/protected", validateAuth, protectedRoute);
