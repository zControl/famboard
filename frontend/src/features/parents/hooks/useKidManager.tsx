import { usersApi } from "@/features/admin/api/usersApi";
import { useQuery } from "@tanstack/react-query";

export const useKidManager = () => {
  const {
    data: kidIdsResponse,
    isLoading: isLoadingIds,
    error: idsError,
  } = useQuery({
    queryKey: ["kidIds"],
    queryFn: usersApi.getUserByGroup("kid"),
  });

  // Sort the response by firstName
  const sortedKidProfiles = [...(kidIdsResponse || [])].sort((a, b) =>
    (a.profile.firstName || "").localeCompare(b.profile.firstName || ""),
  );

  const kidIds =
    sortedKidProfiles?.map((userByGroup) => userByGroup.profile.userId) || [];

  return {
    kidProfiles: sortedKidProfiles,
    kidIds,
    isLoadingIds,
    idsError,
  };
};
