import { apiClient } from "@/api/apiClient";
import { UserProfile } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (userId: string) => {
  if (!userId) {
    console.error("useUserProfile called with undefined userId");
  }
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async (): Promise<UserProfile> => {
      const res = await apiClient.get<UserProfile>(`/users/${userId}/profile`);
      return res;
    },
  });
};
