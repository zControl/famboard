import { apiClient } from "@/api/apiClient";
import { UserProfile } from "@/types/user";
import { useQueries, useQuery } from "@tanstack/react-query";

/**
 * @returns An object containing the following properties:
 * - kidIds: an array of strings containing the ids of the kids.
 * - isLoadingIds: a boolean indicating whether the fetch for the ids is in progress.
 * - idsError: an optional error object or null if there was no error.
 * - getKidProfile: a function that takes a kid's id and returns an object containing the following properties:
 *   - data: the UserProfile object of the kid with the given id.
 *   - isLoading: a boolean indicating whether the fetch for the kid's profile is in progress.
 *   - error: an optional error object or null if there was no error.
 */
export const useKidManager = () => {
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
