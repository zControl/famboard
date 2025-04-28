import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { ApiHealthResponse, ApiRootResponse, ApiVersionResponse } from "@/api/rootResponses";

export const rootApi = {
  getRoot: () => apiClient.get<ApiRootResponse>(API_ENDPOINTS.BASE),
  getHealth: () => apiClient.get<ApiHealthResponse>(API_ENDPOINTS.BASE + '/health'),
  getVersion: () => apiClient.get<ApiVersionResponse>(API_ENDPOINTS.BASE + '/version'),
};