import { CookieOptions, Request, Response } from "express";
import { AuthModel } from "../models/auth.model";
import { AuthType, RegisterType } from "../types/AuthTypes";
import { userRegistrationSchema } from "../schemas/AuthSchema";
import { comparePassword, createToken, hashPassword } from "../utils/UtilsAuth";

// Controlador para el registro de usuario
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validation = userRegistrationSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ errors: validation.error.errors });
      return;
    }
    const { name, email, password }: RegisterType = validation.data;

    console.log(name, email, password);

    const foundEmail = await AuthModel.getUserByEmail(email);

    if (foundEmail) {
      res.status(400).json({ errors: "El email ya fue registrado" });
      return;
    }
    const hashedPassword = await hashPassword(password);

    const newUser = await AuthModel.RegisterUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error durante el registro del usuario:", err);
    res.status(500).json({
      message: "Error registrando el usuario",
      error: err.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Faltan los campos necesarios: email o contraseña" });
    }

    const user = await AuthModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "El email no está registrado" });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(404).json({ message: "La contraseña es incorrecta" });
    }

    const token = createToken(user);
    const options: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    };

    return res
      .status(200)
      .cookie("access_token", token, options)
      .json({
        message: "Login exitoso",
        user: { id: user.user_id, email: user.email, name: user.name },
      });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({
      message: "Error al intentar iniciar sesión",
      error: err.message,
    });
  }
};

export const protectedRoute = (req: Request, res: Response) => {
  const user = req.user as AuthType; // Asegúrate de hacer el casting a AuthType

  if (!user) {
    return res.status(401).json({ message: "Usuario no autorizado" });
  }

  return res.status(200).json({ message: "Usuario autorizado", user });
};
