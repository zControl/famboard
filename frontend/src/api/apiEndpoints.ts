const BASE_DOMAIN = import.meta.env.VITE_API_URL || 'localhost';
const BASE_PORT = import.meta.env.VITE_API_PORT || '3000';
const BASE_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

const BASE_URL = `http://${BASE_DOMAIN}:${BASE_PORT}/${BASE_VERSION}`;

export const API_ENDPOINTS = {
  BASE: BASE_URL,
  TASKS: {
    BASE: '/tasks',
    GET_ALL: '/tasks',
    GET_ONE: (id: string) => `/tasks/${id}`,
    CREATE: '/tasks',
    UPDATE: (id: string) => `/tasks/${id}`,
    DELETE: (id: string) => `/tasks/${id}`,
    ASSIGN_USERS: (id: string) => `/tasks/${id}/assign`,
    GET_ASSIGNED_USERS: (id: string) => `/tasks/${id}/assigned-users`,
    GET_USER_ASSIGNED: (userId: string) => `/tasks/user/${userId}`,
  },
}
