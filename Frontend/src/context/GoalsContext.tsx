import React, { createContext, useContext, useState, ReactNode } from "react";
import { useCRUDGoals } from "../hooks/useFetchingData";
import { MetaFrontend } from "../types/Metas";

interface GoalsContextType {
  filteredGoals: MetaFrontend[];
  setPriority: (priority: string) => void;
  setGoalState: (goalState: string) => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const GoalsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data } = useCRUDGoals();
  const [priority, setPriority] = useState("");
  const [goalState, setGoalState] = useState("");

  const filteredGoals =
    data.goals?.filter((goal) => {
      const matchesPriority = !priority || goal.prioridad === priority;
      const matchesGoalState = !goalState || goal.completado === goalState;

      return matchesPriority && matchesGoalState;
    }) || [];

  return (
    <GoalsContext.Provider
      value={{
        filteredGoals,
        setPriority,
        setGoalState,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = (): GoalsContextType => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
};
