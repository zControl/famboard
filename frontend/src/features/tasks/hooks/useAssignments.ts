// frontend/src/features/tasks/hooks/useAssignments.ts
import { getAssignedUsers } from "@/features/tasks/api/taskApi";
import { AssignedTaskResponse } from "@/types/task";
import { useQuery } from "@tanstack/react-query";

export const useAssignments = (taskId: string) => {
  const { data: taskAssignments, isLoading, isError } = useQuery<AssignedTaskResponse[], Error>({
    queryKey: ["task-assignments", taskId],
    queryFn: () => getAssignedUsers(taskId),
  });

  return {
    taskAssignments,
    isLoading,
    isError,
  }
};