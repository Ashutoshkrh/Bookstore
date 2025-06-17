import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, ApiError } from '@/types';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available (only in browser)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access (only in browser)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }
    
    // Transform error to our ApiError format
    const apiError: ApiError = {
      code: error.response?.status || 500,
      success: false,
      message: error.response?.data?.message || error.message || 'An error occurred',
      data: null,
    };
    
    return Promise.reject(apiError);
  }
);

// Generic API methods
export const apiClient = {
  get: <T>(url: string): Promise<T> => api.get(url).then(res => res.data),
  post: <T>(url: string, data?: any): Promise<T> => api.post(url, data).then(res => res.data),
  put: <T>(url: string, data?: any): Promise<T> => api.put(url, data).then(res => res.data),
  patch: <T>(url: string, data?: any): Promise<T> => api.patch(url, data).then(res => res.data),
  delete: <T>(url: string): Promise<T> => api.delete(url).then(res => res.data),
};

export default api;
