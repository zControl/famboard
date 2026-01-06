import { usersApi } from "@/features/admin/api/usersApi";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserProfile } from "@/features/user/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile: Partial<UserProfile>) => {
      if (!user) throw new Error("User not found");
      return usersApi.updateProfile(user.id, updatedProfile);
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
    queryFn: async () => {
      if (!user) throw new Error("User not found");
      return usersApi.getProfile(user.id)();
    },
  });

  return {
    updateProfileMutation,
    profile,
    isLoading,
    error,
  };
};
