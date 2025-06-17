import { apiClient } from '@/lib/api';
import { 
  Author, 
  AuthorDisplay,
  CreateAuthorDto, 
  UpdateAuthorDto,
  ApiResponse 
} from '@/types';

export const authorService = {
  // Get all authors
  getAllAuthors: async (): Promise<AuthorDisplay[]> => {
    try {
      const response = await apiClient.get<ApiResponse<AuthorDisplay[]>>('/authors');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching authors:', error);
      // Return empty array if backend is not available
      if (error.code === 500 || error.message?.includes('Network Error') || error.message?.includes('ECONNREFUSED')) {
        console.warn('Backend not available, returning empty array');
        return [];
      }
      throw error;
    }
  },

  // Get author by ID
  getAuthorById: async (id: string): Promise<AuthorDisplay> => {
    try {
      const response = await apiClient.get<ApiResponse<AuthorDisplay>>(`/authors/${id}`);
      if (!response.data) {
        throw new Error('Author not found');
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching author ${id}:`, error);
      throw error;
    }
  },

  // Create new author
  createAuthor: async (authorData: CreateAuthorDto): Promise<void> => {
    try {
      await apiClient.post<ApiResponse<null>>('/authors', authorData);
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  },

  // Update author
  updateAuthor: async (id: string, authorData: UpdateAuthorDto): Promise<void> => {
    try {
      await apiClient.put<ApiResponse<null>>(`/authors/${id}`, authorData);
    } catch (error) {
      console.error(`Error updating author ${id}:`, error);
      throw error;
    }
  },

  // Search authors
  searchAuthors: async (query: string): Promise<AuthorDisplay[]> => {
    try {
      const response = await apiClient.get<ApiResponse<AuthorDisplay[]>>(`/authors?search=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (error) {
      console.error('Error searching authors:', error);
      throw error;
    }
  },
};
