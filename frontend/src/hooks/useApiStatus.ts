import { apiStatus } from "@/api/apiStatus";
import { ApiHealthResponse, ApiRootResponse, ApiVersionResponse } from "@/types/api";
import { useQueries } from "@tanstack/react-query";

export const useApiStatus = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["ApiRoot"],
        queryFn: async (): Promise<ApiRootResponse> => {
          const res = await apiStatus.getRoot();
          return res;
        },
      },
      {
        queryKey: ["ApiVersion"],
        queryFn: async (): Promise<ApiVersionResponse> => {
          const res = await apiStatus.getVersion();
          return res;
        },
      },
      {
        queryKey: ["ApiHealth"],
        queryFn: async (): Promise<ApiHealthResponse> => {
          const res = await apiStatus.getHealth();
          return res;
        },
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