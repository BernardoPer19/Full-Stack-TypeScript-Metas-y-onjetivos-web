import pool from "../db/db";

export const getIdByName = async (table: string, column: string, name: string) => {
  const query = `SELECT ${column} FROM ${table} WHERE nombre = $1`;
  const res = await pool.query(query, [name]);

  if (res.rowCount === 0) {
    throw new Error(`No se encontró ${name} en la tabla ${table}`);
  }

  return res.rows[0][column];
};
