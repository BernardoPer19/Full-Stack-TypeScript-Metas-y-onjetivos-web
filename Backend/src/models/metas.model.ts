import pool from "../db/db";
import { MetaDB, MetaFrontend, UserId } from "../types/MetasTypes";
import { getIdByName } from "../utils/MetasUtils";

export const getMetas = async (user_id: UserId) => {
  const query = `
  SELECT  
    m.metas_id,
		m.nombre_meta AS meta,
		m.descripcion,
		m.fecha_creacion,
		m.beneficio,
		m.tiempo_de_realizacion,
		m.user_id,
		p.nombre,
		c.nombre,
		e.nombre
  FROM
	  metas_tb m
	INNER JOIN
	  prioridad_tb p ON m.prioridad_id = p.prioridad_id
	INNER JOIN 
	  etiqueta_tb e ON m.etiqueta_id = e.etiqueta_id 
	INNER JOIN
	  completado_tb c ON m.completado_id = c.completado_id
  WHERE 
    user_id = $1`;

  const values = user_id;

  const { rows } = await pool.query(query, [values]);
  return rows;
};

export const getMetaById = async (user_id: UserId) => {
  const query = "SELECT * FROM metas_tb WHERE metas_id = $1";
  const { rows } = await pool.query(query, [user_id]);
  return rows[0];
};

export const createMeta = async (meta: MetaFrontend): Promise<MetaDB> => {
  const prioridad_id = await getIdByName(
    "prioridad_tb",
    "prioridad_id",
    meta.prioridad
  );
  const completado_id = await getIdByName(
    "completado_tb",
    "completado_id",
    meta.completado
  );
  const etiqueta_id = await getIdByName(
    "etiqueta_tb",
    "etiqueta_id",
    meta.etiqueta
  );

  const query = `
    INSERT INTO metas_tb (
      nombre_meta, descripcion, fecha_creacion, beneficio, 
      tiempo_de_realizacion, user_id, prioridad_id, completado_id, etiqueta_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [
    meta.nombre_meta,
    meta.descripcion,
    meta.fecha_creacion,
    meta.beneficio,
    meta.tiempo_de_realizacion,
    meta.user_id,
    prioridad_id,
    completado_id,
    etiqueta_id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateMeta = async (
  id: number,
  meta: Partial<MetaFrontend> // Usamos el tipo MetaFrontend para mantener la consistencia
): Promise<MetaDB | null> => {
  // Filtramos las claves que están definidas y generamos el SQL dinámicamente
  const fields = Object.keys(meta)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(", ");

  const values = Object.values(meta);
  const query = `UPDATE metas_tb SET ${fields} WHERE metas_id = $1 RETURNING *`;
  const result = await pool.query(query, [id, ...values]);
  return result.rows[0] || null;
};

export const deleteMeta = async (id: number): Promise<MetaDB | null> => {
  const query = "DELETE FROM metas_tb WHERE metas_id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};
