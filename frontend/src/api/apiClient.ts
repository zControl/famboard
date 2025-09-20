import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './apiEndpoints';

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiErrorHandlerOptions {
  showErrorToast?: boolean;
  customErrorHandler?: (error: ApiError) => void;
  errorContext?: string;
}

const defaultErrorHandlerOptions: ApiErrorHandlerOptions = {
  showErrorToast: true,
};

export const handleApiError = (
  error: unknown,
  url: string,
  options: ApiErrorHandlerOptions = defaultErrorHandlerOptions
): never => {
  // Convert to ApiError if it's not already
  const apiError = error instanceof ApiError
    ? error
    : error instanceof AxiosError && error.response
      ? new ApiError(
        error.response.data?.message || error.message || 'Unknown error',
        error.response.status,
        error.response.data
      )
      : new ApiError('Unknown error occurred', 500);

  // This is where we pop the toast.
  if (options.showErrorToast !== false) {
    console.error(`POPATOAST (Code ${apiError.status}) in ${options.errorContext || 'API call'} to ${url}:`);
  }

  // Call custom handler if provided
  if (options.customErrorHandler) {
    options.customErrorHandler(apiError);
  }

  // Always throw the error for the caller to handle if needed
  throw apiError;
};



export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig, options?: ApiErrorHandlerOptions): Promise<T> => {
    if (url.includes('undefined')) {
      throw new ApiError('Invalid URL: contains undefined', 400);
    }
    try {
      const response = await axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      return handleApiError(error, url, options);
    }
  },

  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig, options?: ApiErrorHandlerOptions): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      return handleApiError(error, url, options);
    }
  },

  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig, options?: ApiErrorHandlerOptions): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      return handleApiError(error, url, options);
    }
  },

  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig, options?: ApiErrorHandlerOptions): Promise<T> => {
    try {
      const response = await axiosInstance.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      return handleApiError(error, url, options);
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig, options?: ApiErrorHandlerOptions): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      return handleApiError(error, url, options);
    }
  },

  request: async <T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    options?: ApiErrorHandlerOptions
  ): Promise<T> => {
    try {
      const response = await axiosInstance.request<T>({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, url, {
        ...options,
        errorContext: `${method.toUpperCase()} request`
      });
    }
  },
};