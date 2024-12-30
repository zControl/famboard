import { UserProfile } from "@/types/user";
import { createApiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useKidManager = () => {
  const apiClient = createApiClient(API_ENDPOINTS.BASE);

  const {
    data: kidIds,
    isLoading: isLoadingIds,
    error: idsError,
  } = useQuery({
    queryKey: ["kidIds"],
    queryFn: async () => {
      const response = await apiClient.get<string[]>("/users/kid");
      return response;
    },
  });

  const kidProfileQueries = useQueries({
    queries: (kidIds ?? []).map((id) => ({
      queryKey: ["kid-profile", id],
      queryFn: () => apiClient.get<UserProfile>(`/users/${id}/profile`),
      staleTime: 5 * 60 * 1000, // 5 minutes
    })),
  });

  const getKidProfile = (id: string) => {
    const profileQuery = kidProfileQueries.find(
      (query) => query.data?.userId === id,
    );
    return {
      data: profileQuery?.data,
      isLoading: profileQuery?.isLoading,
      error: profileQuery?.error,
    };
  };

  return {
    kidIds,
    isLoadingIds,
    idsError,
    getKidProfile,
  };
};
