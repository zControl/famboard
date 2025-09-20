import { taskApi } from "@/features/tasks/api/taskApi";
import { Task } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTasks = () => {
  const queryClient = useQueryClient();
  const refreshTasks = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  const { data: tasks, isLoading, error } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: refreshTasks,
  })

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, task }: { taskId: string, task: Partial<Task> }) => taskApi.updateTask(taskId, task),
    onSuccess: refreshTasks,
  })

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => taskApi.deleteTask(taskId),
    onSuccess: refreshTasks,
  })

  const assignTaskMutation = useMutation({
    mutationFn: ({ taskId, userIds }: { taskId: string, userIds: string[] }) => taskApi.assignUsersToTask(taskId, userIds),
    onSuccess: refreshTasks,
  })

  return {
    queryClient,
    tasks,
    refreshTasks,
    addTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    assignTaskMutation,
    isLoading,
    error,
  };
}

export const useTaskBySequenceNumber = (sequenceNumber: string) => useQuery({
  queryKey: ["taskDetails", sequenceNumber],
  queryFn: () => taskApi.getTask(sequenceNumber),
});