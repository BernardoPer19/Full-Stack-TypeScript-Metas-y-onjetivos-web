import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

import { JWT_SECRET_PASSWORD, SALT_ROUNDS } from "../config";
import { AuthType } from "../types/AuthTypes";

const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error: any) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error: any) {
    throw new Error(`Error comparing passwords: ${error.message}`);
  }
};

const createToken = (user: AuthType): string => {
  try {
    const token = jwt.sign(
      {
        user_id: user.user_id,
        nombre: user.nombre,
        email: user.email,
        createAt: user.createAt,
      },
      JWT_SECRET_PASSWORD,
      {
        expiresIn: "24h",
      }
    );

    return token;
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};

const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET_PASSWORD);
  } catch (error: any) {
    throw new Error(`Error verifying token: ${error.message}`);
  }
};

export { hashPassword, comparePassword, createToken, verifyToken };
