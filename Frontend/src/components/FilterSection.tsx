import { useGoals } from "../context/GoalsContext";

function FilterSection() {
  const { setPriority, setGoalState } = useGoals();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white shadow-md rounded-2xl max-w-[1000px] m-auto mt-10">
      <div className="flex flex-col w-full sm:w-1/2">
        <label className="mb-1 text-sm font-medium text-gray-700">
          Filtrar por Prioridad
        </label>
        <select
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <div className="flex flex-col w-full sm:w-1/2">
        <label className="mb-1 text-sm font-medium text-gray-700">
          Filtrar por Estado
        </label>
        <select
          onChange={(e) => setGoalState(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completada">Completada</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSection;
