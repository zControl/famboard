import { UserProfile } from "@/types/user";
import { createApiClient } from "@/utils/apiClient";
import { API_ENDPOINTS } from "@/utils/apiEndpoints";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useKidManager = () => {
  const apiClient = createApiClient(API_ENDPOINTS.BASE);

  const {
    data: kidIdsResponse,
    isLoading: isLoadingIds,
    error: idsError,
  } = useQuery({
    queryKey: ["kidIds"],
    queryFn: async () => {
      const response =
        await apiClient.get<{ id: string }[]>("/users/group/kid");
      return response;
    },
  });

  const kidIds = kidIdsResponse ?? [];

  const kidProfileQueries = useQueries({
    queries: kidIds.map((kidData) => ({
      queryKey: ["kid-profile", kidData.id],
      queryFn: () => apiClient.get<UserProfile>(`/users/${kidData.id}/profile`),
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
    kidIds: kidIds.map((kid) => kid.id),
    isLoadingIds,
    idsError,
    getKidProfile,
  };
};
