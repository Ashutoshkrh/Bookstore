// Generic API response structure
export interface ApiResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data: T | null;
}

// API error response
export interface ApiError {
  code: number;
  success: false;
  message: string;
  data: null;
}

// API success response
export interface ApiSuccess<T> {
  code: number;
  success: true;
  message: string;
  data: T;
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// Paginated response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Search parameters
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Form validation error
export interface FormError {
  field: string;
  message: string;
}

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API endpoints
export const API_ENDPOINTS = {
  BOOKS: '/books',
  AUTHORS: '/authors',
} as const;
