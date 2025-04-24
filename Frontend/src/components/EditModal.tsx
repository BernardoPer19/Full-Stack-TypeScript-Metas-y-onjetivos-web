import { useForm } from "react-hook-form";
import { UpdateGoalsType } from "../types/Metas";
import { useCRUDGoals } from "../hooks/useFetchingData";
import { MetaFrontend } from "../types/Metas";

interface Props {
  meta: MetaFrontend;
  onClose: () => void;
}

const EditMetaModal: React.FC<Props> = ({ meta, onClose }) => {
  const { update } = useCRUDGoals();

  const { register, handleSubmit } = useForm<UpdateGoalsType>({
    defaultValues: {
      nombre_meta: meta.nombre_meta,
      descripcion: meta.descripcion,
      beneficio: meta.beneficio,
      tiempo_de_realizacion: meta.tiempo_de_realizacion,
      prioridad: meta.prioridad,
      completado: meta.completado,
      etiqueta: meta.etiqueta,
    },
  });

  const onSubmit = (data: UpdateGoalsType) => {
    if (!meta.metas_id) return;
    update.updateGoal({ id: meta.metas_id, data });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg space-y-6"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">Editar Meta</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="nombre_meta">Nombre</label>
          <input
            {...register("nombre_meta")}
            id="nombre_meta"
            className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre de la meta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="descripcion">Descripción</label>
          <input
            {...register("descripcion")}
            id="descripcion"
            className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción de la meta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="beneficio">Beneficio</label>
          <input
            {...register("beneficio")}
            id="beneficio"
            className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Beneficio de la meta"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="tiempo_de_realizacion">Tiempo de realización</label>
          <input
            {...register("tiempo_de_realizacion")}
            id="tiempo_de_realizacion"
            className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tiempo estimado"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="prioridad">Prioridad</label>
          <select
            {...register("prioridad")}
            id="prioridad"
            className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="completado">Estado de la meta</label>
          <select
            {...register("completado")}
            id="completado"
            className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="etiqueta">Etiqueta</label>
          <input
            {...register("etiqueta")}
            id="etiqueta"
            className="input w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Etiqueta (opcional)"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMetaModal;
