export type Completado = "Pendiente" | "En Progreso" | "Completada";
export type Prioridad = "Baja" | "Media" | "Alta";

export interface Etiqueta {
  etiqueta_id: number;
  nombre: string;
}

export interface MetaFrontend {
  metas_id?: number;
  nombre_meta: string;
  descripcion: string;
  fecha_creacion: string;
  beneficio: string;
  tiempo_de_realizacion: string;
  prioridad: Prioridad;
  completado: Completado;
  etiqueta: string;
  user_id?: number;
}

export interface MetaDB {
  metas_id: number;
  nombre_meta: string;
  descripcion: string;
  fecha_creacion: string;
  beneficio: string;
  tiempo_de_realizacion: string;
  user_id: number;
  prioridad_id: number;
  completado_id: number;
  etiqueta_id: number;
}

export type UserId = Pick<MetaDB, "user_id">;
