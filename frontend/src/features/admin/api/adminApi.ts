import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { User } from "@/types/user";

export const adminApi = {
  getUsers: () => apiClient.get<User[]>(API_ENDPOINTS.USERS.GET_ALL),
  getUser: (id: string) => apiClient.get<User>(API_ENDPOINTS.USERS.GET_BY_ID(id)),
  getUserByGroup: (group: string) => apiClient.get<User[]>(API_ENDPOINTS.USERS.GET_BY_GROUP(group)),
  updateUser: (id: string, user: Partial<User>) => apiClient.patch<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE(id), user),
}