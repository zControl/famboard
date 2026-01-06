import { taskApi } from "@/features/tasks/api/taskApi";
import { AssignedUserResponse } from "@/features/tasks/types";
import { useQuery } from "@tanstack/react-query";


export const useTaskAssignments = (taskId: string) => {
  const { data: taskAssignments, isLoading, isError, refetch } = useQuery<AssignedUserResponse[], Error>({
    queryKey: ["task-assignments", taskId],
    queryFn: () => taskApi.getAssignedUsers(taskId),
  });

  return {
    taskAssignments: taskAssignments || [],
    isLoading,
    isError,
    refetch,
  }
};