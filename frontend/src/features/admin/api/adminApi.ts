import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { User } from "@/types/user";

export const adminApi = {
  getUsers: () => apiClient.get<User[]>(API_ENDPOINTS.USERS.GET_ALL),
  getUser: (id: string) => apiClient.get<User>(API_ENDPOINTS.USERS.GET_ONE(id)),
  getUserByGroup: (group: string) => apiClient.get<User[]>(API_ENDPOINTS.USERS.GET_BY_GROUP(group)),
  createUser: (user: Partial<User>) => apiClient.post<User>(API_ENDPOINTS.USERS.CREATE, user),
  updateUser: (id: string, user: Partial<User>) => apiClient.patch<User>(API_ENDPOINTS.USERS.UPDATE(id), user),
  deleteUser: (id: string) => apiClient.delete(API_ENDPOINTS.USERS.DELETE(id)),
}