import { useCRUDGoals } from "../hooks/useFetchingData";
import MetaCard from "./MetaCard";

function AllList() {
  const { data } = useCRUDGoals();
  console.log(data);
  
  return (
    <section>
      {data.goals?.map((goal) => (
        <MetaCard key={goal.metas_id} meta={goal} />
      ))}
    </section>
  );
}

export default AllList;
