import { useState } from "react";
import MetaCard from "./MetaCard";
import { MetaFrontend } from "../types/Metas";
import EditMetaModal from "./EditModal";
import { useGoals } from "../context/GoalsContext";

function AllList() {
  const { filteredGoals } = useGoals();
  const [metaToEdit, setMetaToEdit] = useState<MetaFrontend | null>(null);

  return (
    <section className="flex gap-4 items-center justify-center container m-auto mt-15 flex-col">
      <h1 className="text-5xl font-semibold">Your Goals</h1>
      <main className="flex gap-4 items-center justify-center container m-auto flex-wrap">
        {filteredGoals?.map((goal) => (
          <MetaCard
            key={goal.metas_id}
            meta={goal}
            onEdit={() => setMetaToEdit(goal)}
          />
        ))}
      </main>

      {metaToEdit && (
        <EditMetaModal meta={metaToEdit} onClose={() => setMetaToEdit(null)} />
      )}
    </section>
  );
}

export default AllList;
