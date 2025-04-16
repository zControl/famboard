import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { ApiHealth, ApiRoot, ApiVersion } from "@/types/api";

export const apiStatus = {
  getBase: () => apiClient.get<ApiRoot>(API_ENDPOINTS.BASE),
  getHealth: () => apiClient.get<ApiHealth>(API_ENDPOINTS.BASE + '/health'),
  getVersion: () => apiClient.get<ApiVersion>(API_ENDPOINTS.BASE + '/version'),
};