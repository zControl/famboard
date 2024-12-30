import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserProfile } from "@/types/user";
import { createApiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
  const apiClient = createApiClient(API_ENDPOINTS.BASE);
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const updateProfile = useMutation({
    mutationFn: async (updatedProfile: Partial<UserProfile>) => {
      if (!user) throw new Error("User not found");
      const res = await apiClient.patch<UserProfile>(
        `/users/${user.id}/profile`,
        updatedProfile,
      );
      return res;
    },
    onSuccess: () => {
      // Invalidate and refetch the profile query
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<UserProfile> => {
      if (!user) throw new Error("User not found");
      const res = await apiClient.get<UserProfile>(`/users/${user.id}/profile`);
      return res;
    },
  });

  /*   console.log("useProfile hook generated:");
  console.log("user", user);
  console.log("profile", profile);
  console.log("isLoading", isLoading);
  console.log("error", error); */

  return { updateProfile, profile, isLoading, error };
};
