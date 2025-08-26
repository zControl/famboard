import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './apiEndpoints';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    if (url.includes('undefined')) {
      console.error(`Attempting to make a GET request with undefined in the URL: ${url}`);
      throw new Error('Invalid URL: contains undefined');
    }
    try {
      const response = await axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`Error in GET request to ${url}:`, error);
      throw error;
    }
  },

  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in POST request to ${url}:`, error);
      throw error;
    }
  },

  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in PUT request to ${url}:`, error);
      throw error;
    }
  },

  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error(`Error in PATCH request to ${url}:`, error);
      throw error;
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      console.error(`Error in DELETE request to ${url}:`, error);
      throw error;
    }
  },

  request: async <T>(method: 'get' | 'post' | 'put' | 'patch' | 'delete', url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await axiosInstance.request<T>({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      console.error(`Error in ${method} request to ${url}:`, error);
      throw error;
    }
  },
};