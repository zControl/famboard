import { Task } from "@/types/task";
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