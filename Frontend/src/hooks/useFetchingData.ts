import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MetaFrontend, UpdateGoalsType } from "../types/Metas";
import {
  deleteMetaService,
  getAllGoalsServices,
  updateMetaService,
} from "../services/UserDataServices";

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
    mutationFn: (id: number) => deleteMetaService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

  const {
    mutate: updateGoal,
    status: updateeGoalStatus,
    error: updateGoalError,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateGoalsType }) =>
      updateMetaService(id, data),
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

    update: {
      updateGoal,
      updateGoalError,
      updateeGoalStatus,
      isUpdating,
    },
  };
};
