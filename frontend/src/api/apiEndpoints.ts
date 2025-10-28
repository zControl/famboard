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
    GET_ASSIGNED_USERS: (id: string) => `/tasks/assigned-users/${id}`,
    GET_USER_ASSIGNED: (userId: string) => `/tasks/user/${userId}`,
    ASSIGN_USERS: (id: string) => `/tasks/${id}/assign`,
    COMPLETE_TASK: (id: string) => `/tasks/${id}/complete`,
  },
  APROVALS: {
    GET_APPROVALS: `/approvals`,
    GET_APPROVALS_BY_USER: (userId: string) => `/approvals/user/${userId}`,
    APPROVE: (approvalId: string) => `/approvals/${approvalId}/approve`,
    REJECT: (approvalId: string) => `/approvals/${approvalId}/reject`,
  },
  REWARDS: {
    GET_ALL: '/rewards',
    GET_ONE: (id: string) => `/rewards/${id}`,
    CREATE: '/rewards',
    UPDATE: (id: string) => `/rewards/${id}`,
    DELETE: (id: string) => `/rewards/${id}`,
  },
}
