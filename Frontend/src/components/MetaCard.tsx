import { MetaFrontend } from "../types/Metas";

interface Props {
  meta: MetaFrontend;
}

const MetaCard: React.FC<Props> = ({ meta }) => {
  return (
    <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {meta.nombre_meta}
      </h2>
      <p className="text-sm text-gray-500 mb-4">{meta.descripcion}</p>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Fecha de creación:</span>{" "}
          {meta.fecha_creacion}
        </p>
        <p>
          <span className="font-medium">Beneficio:</span> {meta.beneficio}
        </p>
        <p>
          <span className="font-medium">Tiempo estimado:</span>{" "}
          {meta.tiempo_de_realizacion}
        </p>
        <p>
          <span className="font-medium">Prioridad:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${
              meta.prioridad === "Alta"
                ? "bg-red-500"
                : meta.prioridad === "Media"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {meta.prioridad}
          </span>
        </p>
        <p>
          <span className="font-medium">Estado:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${
              meta.completado === "Completada"
                ? "bg-green-600"
                : meta.completado === "En Progreso"
                ? "bg-blue-500"
                : "bg-gray-400"
            }`}
          >
            {meta.completado}
          </span>
        </p>
        <p>
          <span className="font-medium">Etiqueta:</span> #{meta.etiqueta}
        </p>
      </div>
    </div>
  );
};

export default MetaCard;
