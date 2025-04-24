import { useCRUDGoals } from "../hooks/useFetchingData";
import MetaCard from "./MetaCard";

function AllList() {
  const { data } = useCRUDGoals();

  


  return (
    <section className="flex gap-4 items-center justify-center container m-auto mt-15 flex-col">
      <h1 className="text-5xl font-semibold">Your Goals</h1>
      <main className="flex gap-4 items-center justify-center container m-auto ">
        {data.goals?.map((goal) => (
          <MetaCard key={goal.metas_id} meta={goal} />
        ))}
      </main>
    </section>
  );
}

export default AllList;
