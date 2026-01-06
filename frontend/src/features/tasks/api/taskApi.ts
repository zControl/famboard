import { apiClient } from '@/api/apiClient';
import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { AssignedTaskResponse, AssignedUserResponse, Task, TaskListResponse } from "@/features/tasks/types";

export const taskApi = {
  getTasks: () =>
    apiClient.get<TaskListResponse>(API_ENDPOINTS.TASKS.GET_ALL),

  getTaskBySequenceNumber: (sequenceNumber: string) =>
    apiClient.get<Task>(API_ENDPOINTS.TASKS.GET_ONE_BY_SEQUENCE(sequenceNumber)),

  getTask: (taskId: string) =>
    apiClient.get<Task>(API_ENDPOINTS.TASKS.GET_ONE(taskId)),

  createTask: (task: Partial<Task>) =>
    apiClient.post<Task>(API_ENDPOINTS.TASKS.CREATE, task),

  updateTask: (taskId: string, task: Partial<Task>) =>
    apiClient.patch<Task>(API_ENDPOINTS.TASKS.UPDATE(taskId), task),

  deleteTask: (taskId: string) =>
    apiClient.delete<void>(API_ENDPOINTS.TASKS.DELETE(taskId)),

  getAssignedUsers: (taskId: string) =>
    apiClient.get<AssignedUserResponse[]>(API_ENDPOINTS.TASK_ASSIGNMENTS.GET_ASSIGNED_USERS(taskId)),

  getAssignedTasks: (userId: string) =>
    apiClient.get<AssignedTaskResponse>(API_ENDPOINTS.TASK_ASSIGNMENTS.GET_ASSIGNED_TASKS(userId)),

  assignUsersToTask: (taskId: string, userIds: string[]) =>
    apiClient.post<Task>(API_ENDPOINTS.TASK_ASSIGNMENTS.ASSIGN_USERS(taskId), { userIds }),

  completeTask: (taskId: string, userId: string, pointsPossible: number, note?: string) =>
    apiClient.post<Task>(
      API_ENDPOINTS.TASK_COMPLETIONS.COMPLETE_TASK(taskId),
      {
        userId,
        pointsPossible: pointsPossible,
        note
      }
    ),

  assignTasksToUser: (userId: string, taskIds: string[]) =>
    apiClient.post(API_ENDPOINTS.TASK_ASSIGNMENTS.ASSIGN_TASKS_TO_USER(userId), { taskIds }),
};
