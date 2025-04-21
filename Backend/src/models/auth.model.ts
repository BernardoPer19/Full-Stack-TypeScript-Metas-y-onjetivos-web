import pool from "../db/db";
import { RegisterType, AuthType } from "../types/AuthTypes";
import { QueryResult } from "pg";

export class AuthModel {
  static async RegisterUser(newUser: RegisterType): Promise<AuthType> {
    const query = `
      INSERT INTO user_tb (
        nombre, email, password
      ) VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [newUser.nombre, newUser.email, newUser.password];

    const result: QueryResult<AuthType> = await pool.query(query, values);
    return result.rows[0];
  }

  static async getUserByEmail(email: string): Promise<AuthType | null> {
    const query = `SELECT * FROM user_tb WHERE email = $1`;
    const result: QueryResult<AuthType> = await pool.query(query, [email]);
    result.rows.map((res) => {
      console.log("aca", res.createAt);
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }
}
