import { taskApi } from "@/features/tasks/api/taskApi";
import { TaskListResponse } from "@/types/task";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useTasksQuery = () => {
  const queryClient = useQueryClient();

  const refreshTasks = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    queryClient.invalidateQueries({ queryKey: ["taskById"] });
    queryClient.invalidateQueries({ queryKey: ["taskBySequenceNumber"] });
  }

  const { data: tasks, isLoading, error } = useQuery<TaskListResponse>({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks,
  });

  return {
    tasks,
    isLoading,
    error,
    refreshTasks
  }
};