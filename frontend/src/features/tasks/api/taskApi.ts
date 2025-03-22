import { createApiClient } from "@/api/apiClient";
import { AssignedTaskResponse, Task, UserAssignedTaskResponse } from "@/types/task";

const apiClient = createApiClient("http://10.0.0.240:3000/v1");

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await apiClient.get<Task[]>("/tasks");
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function getTask(sequenceNumber: string): Promise<Task> {
  try {
    const response = await apiClient.get<Task>(`/tasks/${sequenceNumber}`);
    return response;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw new Error("Failed to fetch task");
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

export async function updateTask(taskId: string, task: Partial<Task>): Promise<Task> {
  try {
    const response = await apiClient.patch<Task>(`/tasks/${taskId}`, task);
    return response;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
}

export const getAssignedUsers = async (taskId: string): Promise<AssignedTaskResponse[]> => {
  const response = await apiClient.get<AssignedTaskResponse[]>(`/tasks/${taskId}/assigned-users`);
  return response;
};

export const getAssignedTasks = async (userId: string): Promise<UserAssignedTaskResponse[]> => {
  const response = await apiClient.get<UserAssignedTaskResponse[]>(`/tasks/user/${userId}`);
  return response;
};

export const assignUsersToTask = async (taskId: string, userIds: string[]): Promise<Task> => {
  const response = await apiClient.post<Task>(`/tasks/${taskId}/assign`, { userIds });
  return response;
};