import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { User, UserProfile, UsersByGroupResponse } from "@/features/user/types";

export const usersApi = {
  getUsers: () =>
    apiClient.get<User[]>(API_ENDPOINTS.USERS.GET_ALL),

  getUser: (id: string) =>
    apiClient.get<User>(API_ENDPOINTS.USERS.GET_BY_ID(id)),

  getUserByGroup: (group: string) =>
    () => apiClient.get<UsersByGroupResponse[]>(API_ENDPOINTS.USERS.GET_BY_GROUP(group)),

  updateUser: (id: string, user: Partial<User>) =>
    apiClient.patch<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE(id), user),

  getProfile: (userId: string) => () =>
    apiClient.get<UserProfile>(API_ENDPOINTS.USERS.GET_PROFILE(userId)),

  updateProfile: (userId: string, profile: Partial<UserProfile>) =>
    apiClient.patch<UserProfile>(API_ENDPOINTS.USERS.UPDATE_PROFILE(userId), profile),
}