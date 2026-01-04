const BASE_DOMAIN = import.meta.env.VITE_API_URL || 'localhost';
const BASE_PORT = import.meta.env.VITE_API_PORT || '3000';
const BASE_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

const BASE_URL = `http://${BASE_DOMAIN}:${BASE_PORT}/${BASE_VERSION}`;

export const API_ENDPOINTS = {
  BASE: BASE_URL,
  USERS: {
    GET_ALL: '/users',
    GET_BY_GROUP: (group: string) => `/users/group/${group}`,
    GET_BY_ID: (id: string) => `/users/${id}`,
    UPDATE_PROFILE: (id: string) => `/users/${id}/profile`,
    GET_PROFILE: (id: string) => `/users/${id}/profile`,
  },
  TASKS: {
    CREATE: '/tasks',
    GET_ALL: '/tasks',
    GET_ONE_BY_SEQUENCE: (sequenceNumber: string) => `/tasks/by-sequence/${sequenceNumber}`,
    GET_ONE: (id: string) => `/tasks/${id}`,
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
  },
  TASK_ASSIGNMENTS: {
    GET_ASSIGNED_USERS: (taskId: string) => `/task-assignments/assigned-users/${taskId}`,
    GET_ASSIGNED_TASKS: (userId: string) => `/task-assignments/assigned-tasks/${userId}`,
    GET_TASKS_BY_USER: (userId: string) => `/task-assignments/user/${userId}/tasks`,
    ASSIGN_USERS: (taskId: string) => `/task-assignments/tasks/${taskId}/assign`,
    ASSIGN_TASKS_TO_USER: (userId: string) => `/task-assignments/users/${userId}/assign-tasks`,
  },
  TASK_COMPLETIONS: {
    COMPLETE_TASK: (taskId: string) => `/task-completions/${taskId}/complete`,
  },
  TASK_APPROVALS: {
    GET_ALL: '/task-approvals',
    GET_PENDING_APPROVALS: `/task-approvals/pending`,
    GET_APPROVALS_BY_USER: (userId: string) => `/task-approvals/user/${userId}`,
    GET_APPROVAL_COUNTS: (period: string, userId: string) =>
      `/task-approvals/counts/${period}/${userId}`,
    APPROVE: (approvalId: string) => `/task-approvals/${approvalId}/approve`,
    REJECT: (approvalId: string) => `/task-approvals/${approvalId}/reject`,
  },
  REWARDS: {
    GET_ALL: '/rewards',
    GET_ONE: (id: string) => `/rewards/${id}`,
    CREATE: '/rewards',
    UPDATE: (id: string) => `/rewards/${id}`,
    DELETE: (id: string) => `/rewards/${id}`,
  },
}
