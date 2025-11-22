import { rootApi } from "@/api/rootApi";
import { useQueries } from "@tanstack/react-query";

export const useApiStatus = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["ApiRoot"],
        queryFn: rootApi.getRoot,
      },
      {
        queryKey: ["ApiVersion"],
        queryFn: rootApi.getVersion,
      },
      {
        queryKey: ["ApiHealth"],
        queryFn: rootApi.getHealth
      },
    ],
  });

  const [apiRootQuery, apiVersionQuery, apiHealthQuery] = queries;

  return {
    apiRoot: {
      isPending: apiRootQuery.isLoading,
      isFetching: apiRootQuery.isFetching,
      isError: apiRootQuery.isError,
      data: apiRootQuery.data,
    },
    apiVersion: {
      isPending: apiVersionQuery.isLoading,
      isFetching: apiVersionQuery.isFetching,
      isError: apiVersionQuery.isError,
      data: apiVersionQuery.data,
    },
    apiHealth: {
      isPending: apiHealthQuery.isLoading,
      isFetching: apiHealthQuery.isFetching,
      isError: apiHealthQuery.isError,
      data: apiHealthQuery.data,
    },
  };
};