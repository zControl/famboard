import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { UserProfile, UsersByGroupResponse } from "@/types/user";


export const kidApi = {
  getKids: () => apiClient.get<UsersByGroupResponse[]>(API_ENDPOINTS.USERS.GET_BY_GROUP('kid')),
  getUserProfile: (kidData: string) => () => apiClient.get<UserProfile>(`/users/${kidData}/profile`)
}