import { usersApi } from "@/features/admin/api/usersApi";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useKidManager = () => {
  const {
    data: kidIdsResponse,
    isLoading: isLoadingIds,
    error: idsError,
  } = useQuery({
    queryKey: ["kidIds"],
    queryFn: usersApi.getUserByGroup("kid"),
  });

  const kidIds =
    kidIdsResponse?.map((userByGroup) => userByGroup.profile.userId) || [];

  const kidProfileQueries = useQueries({
    queries: kidIds.map((kidData) => ({
      queryKey: ["kid-profile", kidData],
      queryFn: usersApi.getUserProfile(kidData),
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
