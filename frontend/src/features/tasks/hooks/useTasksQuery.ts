import { taskApi } from "@/features/tasks/api/taskApi";
import { TaskListResponse } from "@/features/tasks/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useTasksQuery = () => {
  const queryClient = useQueryClient();

  const refreshTasks = () => {
    queryClient.resetQueries({ queryKey: ["tasks"] });

  }

  const { data: tasks, isLoading, error } = useQuery<TaskListResponse>({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks,
  });

  const assignedTasks = tasks?.data ? tasks.data.filter(task =>
    task.assignments.some(assignment => assignment.status === "ASSIGNED")
  ) : [];

  return {
    tasks,
    assignedTasks,
    isLoading,
    error,
    refreshTasks
  }
};