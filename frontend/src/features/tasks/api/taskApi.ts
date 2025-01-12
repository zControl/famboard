import { AssignedTaskResponse, Task } from "@/types/task";
import { createApiClient } from "@/utils/apiClient";

const apiClient = createApiClient("http://localhost:3000/v1");

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await apiClient.get<Task[]>("/tasks");
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function createTask(task: Partial<Task>): Promise<Task> {
  try {
    const response = await apiClient.post<Task>("/tasks", task);
    return response;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
}

export const getAssignedUsers = async (taskId: string): Promise<AssignedTaskResponse[]> => {
  const response = await apiClient.get<AssignedTaskResponse[]>(`/tasks/${taskId}/assigned-users`);
  return response;
};

export const assignUserToTask = async (taskId: string, userId: string): Promise<Task> => {
  const response = await apiClient.post<Task>(`/tasks/${taskId}/assign-single`, { userId });
  return response;
};

export const assignMultipleUsersToTask = async (taskId: string, userIds: string[]): Promise<Task> => {
  const response = await apiClient.post<Task>(`/tasks/${taskId}/assign-multiple`, { userIds });
  return response;
};