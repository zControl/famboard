import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { AssignedTaskResponse, PendingCompletionsResponse, Task, UserAssignedTaskResponse } from "@/types/task";

export const taskApi = {
  getTasks: () =>
    apiClient.get<Task[]>(API_ENDPOINTS.TASKS.GET_ALL),

  getTask: (taskId: string) =>
    apiClient.get<Task>(API_ENDPOINTS.TASKS.GET_ONE(taskId)),

  createTask: (task: Partial<Task>) =>
    apiClient.post<Task>(API_ENDPOINTS.TASKS.CREATE, task),

  updateTask: (taskId: string, task: Partial<Task>) =>
    apiClient.patch<Task>(API_ENDPOINTS.TASKS.UPDATE(taskId), task),

  deleteTask: (taskId: string) =>
    apiClient.delete<void>(API_ENDPOINTS.TASKS.DELETE(taskId)),

  getAssignedUsers: (taskId: string) =>
    apiClient.get<AssignedTaskResponse[]>(API_ENDPOINTS.TASKS.GET_ASSIGNED_USERS(taskId)),

  getAssignedTasks: (userId: string) =>
    apiClient.get<UserAssignedTaskResponse[]>(API_ENDPOINTS.TASKS.GET_USER_ASSIGNED(userId)),

  assignUsersToTask: (taskId: string, userIds: string[]) =>
    apiClient.post<Task>(API_ENDPOINTS.TASKS.ASSIGN_USERS(taskId), { userIds }),

  completeTask: (taskId: string, userId: string, pointsPossible: number, note?: string) =>
    apiClient.post<Task>(API_ENDPOINTS.TASKS.COMPLETE_TASK(taskId), { userId, pointsPossible, note }),

  getPendingApprovals: () =>
    apiClient.get<PendingCompletionsResponse>(API_ENDPOINTS.TASKS.GET_APPROVALS),

  getApprovalsByUser: (userId: string) =>
    apiClient.get<PendingCompletionsResponse>(`${API_ENDPOINTS.TASKS.GET_APPROVALS_BY_USER(userId)}`),
};
