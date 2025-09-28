import { taskApi } from "@/features/tasks/api/taskApi";
import { UserAssignedTaskResponse } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

export const useUserAssignedTasks = (userId: string) => {
  const { data: assignedTasks, isLoading, isError, refetch } = useQuery<UserAssignedTaskResponse[], Error>({
    queryKey: ["user-assigned-tasks", userId],
    queryFn: () => taskApi.getAssignedTasks(userId),
  });

  return {
    assignedTasks,
    isLoading,
    isError,
    refetch,
  };
};