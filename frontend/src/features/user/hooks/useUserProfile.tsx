import { usersApi } from "@/features/admin/api/usersApi";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = (userId: string) => {
  if (!userId) {
    console.error("userId is undefined. Can't fetch user profile.");
  }

  const query = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User not found");
      return usersApi.getProfile(userId)();
    },
    enabled: !!userId,
  });

  const avatarUrl = query.data?.avatarUrl || undefined;

  return {
    ...query,
    isLoading: query.isLoading,
    error: query.error,
    userProfile: query.data,
    avatarUrl,
  };
};
