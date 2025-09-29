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

  const kidIds =
    kidIdsResponse?.map((userByGroup) => userByGroup.profile.userId) || [];

  return {
    kidIds,
    isLoadingIds,
    idsError,
  };
};
