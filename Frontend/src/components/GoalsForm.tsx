import { zodResolver } from "@hookform/resolvers/zod";
import type { GoalsDataType } from "../types/Metas";
import { FormData, metaSchema } from "../validations/ValidateGolas";
import React from "react";
import { useForm } from "react-hook-form";

const etiquetasDisponibles = [
  "Fitness",
  "Salud Mental",
  "Nutrición",
  "Carrera Profesional",
  "Educación",
  "Productividad",
  "Finanzas Personales",
  "Relaciones",
  "Creatividad",
  "Viajes",
];

const GoalsForm: React.FC<{ onSubmit: (data: GoalsDataType) => void }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(metaSchema),
  });
  const onFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Nueva Meta</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input
            {...register("nombre_meta")}
            className="w-full border rounded p-2"
          />
          {errors.nombre_meta && (
            <p className="text-red-500 text-sm">{errors.nombre_meta.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Fecha de Creación</label>
          <input
            type="date"
            {...register("fecha_creacion")}
            className="w-full border rounded p-2"
          />
          {errors.fecha_creacion && (
            <p className="text-red-500 text-sm">
              {errors.fecha_creacion.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Beneficio</label>
          <input
            {...register("beneficio")}
            className="w-full border rounded p-2"
          />
          {errors.beneficio && (
            <p className="text-red-500 text-sm">{errors.beneficio.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Tiempo de Realización
          </label>
          <input
            {...register("tiempo_de_realizacion")}
            className="w-full border rounded p-2"
          />
          {errors.tiempo_de_realizacion && (
            <p className="text-red-500 text-sm">
              {errors.tiempo_de_realizacion.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Prioridad</label>
          <select
            {...register("prioridad")}
            className="w-full border rounded p-2"
          >
            <option value="">Seleccionar</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
          {errors.prioridad && (
            <p className="text-red-500 text-sm">{errors.prioridad.message}</p>
          )}
        </div>

        {/* Completado */}
        <div>
          <label className="block font-semibold mb-1">Completado</label>
          <select
            {...register("completado")}
            className="w-full border rounded p-2"
          >
            <option value="">Seleccionar</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
          {errors.completado && (
            <p className="text-red-500 text-sm">{errors.completado.message}</p>
          )}
        </div>

        {/* Etiqueta */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Etiqueta</label>
          <select
            {...register("etiqueta")}
            className="w-full border rounded p-2"
          >
            <option value="">Seleccionar</option>
            {etiquetasDisponibles.map((etiqueta, i) => (
              <option key={i} value={etiqueta}>
                {etiqueta}
              </option>
            ))}
          </select>
          {errors.etiqueta && (
            <p className="text-red-500 text-sm">{errors.etiqueta.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Descripción</label>
          <textarea
            {...register("descripcion")}
            className="w-full border rounded p-2 h-24 resize-none"
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm">{errors.descripcion.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Crear Meta
      </button>
    </form>
  );
};

export default GoalsForm;
