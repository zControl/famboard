import { createTask, getTasks } from "@/features/tasks/api/taskApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTasks = () => {
  const queryClient = useQueryClient();
  const refreshTasks = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  const {data: tasks, isLoading, error} = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: refreshTasks,
  })

/*   console.log("useTasks hook generated:")
  console.log("tasks", tasks); */

  return {
    tasks,
    refreshTasks,
    addTaskMutation,
    isLoading,
    error,
  };
}