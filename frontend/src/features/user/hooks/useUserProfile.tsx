import { createApiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import { UserProfile } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (userId: string) => {
  const apiClient = createApiClient(API_ENDPOINTS.BASE);

  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async (): Promise<UserProfile> => {
      const res = await apiClient.get<UserProfile>(`/users/${userId}/profile`);
      return res;
    },
  });
};
