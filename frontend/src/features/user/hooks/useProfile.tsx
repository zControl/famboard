import { useAuth } from "@/features/auth/hooks/useAuth";
import { createApiClient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface UserProfile {
  username: string;
  email: string;
  firstName: string;
  birthDate: Date;
  bio: string;
  theme: string;
  avatarUrl: string;
  group: string;
}

export const useProfile = () => {
  const apiClient = createApiClient("http://localhost:3000/v1/");
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

  return { updateProfile, profile, isLoading, error };
};
