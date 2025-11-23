import { usersApi } from "@/features/admin/api/usersApi"
import { User } from "@/features/user/types"
import { useQuery } from "@tanstack/react-query"

export const useUserStatistics = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userStatistics"],
    queryFn: async (): Promise<User[]> => {
      const res = await usersApi.getUsers();
      return res;
    },
  })

  const totalUserCount = data?.length ?? 0;
  const totalParentsCount = data?.filter((user) => user.group === "parent").length ?? 0;
  const totalKidsCount = data?.filter((user) => user.group === "kid").length ?? 0;

  return {
    data,
    isLoading,
    isError,
    totalUserCount,
    totalParentsCount,
    totalKidsCount,
  }
}

