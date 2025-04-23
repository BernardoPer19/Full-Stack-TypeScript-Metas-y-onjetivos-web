import { z } from "zod";

export const metaSchema = z.object({
  nombre_meta: z.string().min(1, "Este campo es requerido"),
  descripcion: z.string().min(1, "Este campo es requerido"),
  fecha_creacion: z.string().min(1, "Este campo es requerido"),
  beneficio: z.string().min(1, "Este campo es requerido"),
  tiempo_de_realizacion: z.string().min(1, "Este campo es requerido"),
  prioridad: z.enum(["Baja", "Media", "Alta"]),
  completado: z.enum(["Pendiente", "En Progreso", "Completada"]),
  etiqueta: z.string().min(1, "Este campo es requerido"),
});

export type FormData = z.infer<typeof metaSchema>;
