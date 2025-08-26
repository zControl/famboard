import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { AssignedTaskResponse, Task, UserAssignedTaskResponse } from "@/types/task";

export const taskApi = {
  getTasks: () => apiClient.get<Task[]>(API_ENDPOINTS.TASKS.GET_ALL),
  getTask: (sequenceNumber: string) => apiClient.get<Task>(API_ENDPOINTS.TASKS.GET_ONE(sequenceNumber)),
  createTask: (task: Partial<Task>) => apiClient.post<Task>(API_ENDPOINTS.TASKS.CREATE, task),
  updateTask: (taskId: string, task: Partial<Task>) => apiClient.patch<Task>(API_ENDPOINTS.TASKS.UPDATE(taskId), task),
  getAssignedUsers: (taskId: string) => apiClient.get<AssignedTaskResponse[]>(API_ENDPOINTS.TASKS.GET_ASSIGNED_USERS(taskId)),
  getAssignedTasks: (userId: string) => apiClient.get<UserAssignedTaskResponse[]>(API_ENDPOINTS.TASKS.GET_USER_ASSIGNED(userId)),
  assignUsersToTask: (taskId: string, userIds: string[]) => apiClient.post<Task>(API_ENDPOINTS.TASKS.ASSIGN_USERS(taskId), { userIds }),
};
