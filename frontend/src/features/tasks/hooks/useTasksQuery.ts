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

  const completedTasks = tasks?.data ? tasks.data.filter(task =>
    task.assignments.some(assignment => assignment.status === "COMPLETED")
  ) : [];

  return {
    tasks,
    assignedTasks,
    completedTasks,
    isLoading,
    error,
    refreshTasks
  }
};