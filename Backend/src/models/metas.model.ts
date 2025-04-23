import pool from "../db/db";
import { MetaDB, MetaFrontend } from "../types/MetasTypes";
import { getIdByName } from "../utils/MetasUtils";

export class MetaService {
  // ✅ OBTENER TODAS LAS METAS DE UN USUARIO
  async getAll(user_id: number): Promise<MetaDB[]> {
    const query = `
  SELECT  
    m.metas_id,
    m.nombre_meta,
    m.descripcion,
    m.fecha_creacion,
    m.beneficio,
    m.tiempo_de_realizacion,
    m.user_id,
    p.nombre AS prioridad,
    c.nombre AS completado,
    e.nombre AS etiqueta
  FROM metas_tb m
  INNER JOIN prioridad_tb p ON m.prioridad_id = p.prioridad_id
  INNER JOIN etiqueta_tb e ON m.etiqueta_id = e.etiqueta_id 
  INNER JOIN completado_tb c ON m.completado_id = c.completado_id
  WHERE m.user_id = $1
`;

    const { rows } = await pool.query(query, [user_id]);
    return rows;
  }

  async getById(meta_id: number, user_id: number): Promise<MetaDB | null> {
    const query = `
      SELECT * 
      FROM metas_tb 
      WHERE metas_id = $1 
        AND user_id = $2
    `;
    const { rows } = await pool.query(query, [meta_id, user_id]);
    return rows[0] || null;
  }

  async create(meta: MetaFrontend): Promise<MetaDB> {
    try {
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
    } catch (error) {
      console.error("Error al crear en la DB:", error);
      throw new Error(`Error al crear la meta: ${error}`);
    }
  }

  async update(
    meta_id: number,
    meta: Partial<MetaFrontend>,
    user_id: number
  ): Promise<MetaDB | null> {
    const metaToUpdate = await this.getById(meta_id, user_id);
    if (!metaToUpdate) {
      return null;
    }

    const fields = Object.keys(meta)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = Object.values(meta);
    const query = `UPDATE metas_tb SET ${fields} WHERE metas_id = $1 AND user_id = $2 RETURNING *`;
    const result = await pool.query(query, [meta_id, user_id, ...values]);

    return result.rows[0] || null;
  }

  async delete(meta_id: number): Promise<MetaDB | null> {
    const query = "DELETE FROM metas_tb WHERE metas_id = $1 RETURNING *";
    const result = await pool.query(query, [meta_id]);
    return result.rows[0] || null;
  }
}
