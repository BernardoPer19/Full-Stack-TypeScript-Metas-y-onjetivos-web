import GoalsForm from "../components/GoalsForm";
import { createMetaService } from "../services/UserDataServices";
import { GoalsDataType } from "../types/Metas";

function FormGoalsPage() {
  const handleSubmit = async (data: GoalsDataType) => {
    await createMetaService(data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Crear nueva meta</h1>
      <GoalsForm onSubmit={handleSubmit} />
    </div>
  );
}

export default FormGoalsPage;
