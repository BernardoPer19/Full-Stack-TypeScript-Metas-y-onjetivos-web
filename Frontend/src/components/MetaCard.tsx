import { useCRUDGoals } from "../hooks/useFetchingData";
import { MetaFrontend } from "../types/Metas";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  meta: MetaFrontend;
  onEdit?: () => void;
}

const MetaCard: React.FC<Props> = ({ meta , onEdit}) => {
  const { remove } = useCRUDGoals();

  return (
    <div className="group relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out space-y-4 m-auto ">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
          {meta.nombre_meta}
        </h2>
        <p className="text-sm text-gray-500">{meta.descripcion}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Fecha:</span> {meta.fecha_creacion}
        </div>
        <div>
          <span className="font-medium">Tiempo:</span>{" "}
          {meta.tiempo_de_realizacion}
        </div>
        <div>
          <span className="font-medium">Beneficio:</span> {meta.beneficio}
        </div>
        <div>
          <span className="font-medium">Etiqueta:</span> #{meta.etiqueta}
        </div>
        <div>
          <span className="font-medium">Prioridad:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-white text-xs ${
              meta.prioridad === "Alta"
                ? "bg-red-500"
                : meta.prioridad === "Media"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {meta.prioridad}
          </span>
        </div>
        <div>
          <span className="font-medium">Estado:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-white text-xs ${
              meta.completado === "Completada"
                ? "bg-green-600"
                : meta.completado === "En Progreso"
                ? "bg-blue-500"
                : "bg-gray-400"
            }`}
          >
            {meta.completado}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
          >
            <Pencil className="w-4 h-4" /> Editar
          </button>
        )}

        <button
          onClick={() => {
            if (meta.metas_id !== undefined) {
              remove.deleteGoal(meta.metas_id);
            } else {
              console.error("El ID de la meta es undefined");
            }
          }}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition"
        >
          <Trash2 className="w-4 h-4" /> Eliminar
        </button>
      </div>
    </div>
  );
};

export default MetaCard;
