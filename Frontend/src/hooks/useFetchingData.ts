import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MetaFrontend } from "../types/Metas";
import { getAllGoalsServices } from "../services/UserDataServices";
import { deleteMeta } from "../api/UserDataRequest";

export const useCRUDGoals = () => {
  const queryClient = useQueryClient();

  const {
    data: goals,
    isLoading,
    isError,
    error,
  } = useQuery<MetaFrontend[], Error>({
    queryKey: ["goals"],
    queryFn: getAllGoalsServices,
  });

  const {
    mutate: deleteGoal,
    status: deleteGoalStatus,
    error: deleteGoalError,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: (id: string) => deleteMeta(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

  return {
    data: {
      goals,
      isLoading,
      isError,
      error,
      queryClient,
    },
    remove: {
      deleteGoal,
      status: deleteGoalStatus,
      error: deleteGoalError,
      isPending: isDeleting,
    },
  };
};
