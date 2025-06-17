import { apiClient } from '@/lib/api';
import { 
  Book, 
  CreateBookDto, 
  UpdateBookDto, 
  BookWithAuthor,
  ApiResponse 
} from '@/types';

export const bookService = {
  // Get all books
  getAllBooks: async (): Promise<Book[]> => {
    try {
      const response = await apiClient.get<Book[]>('/books');
      // Handle both direct array response and wrapped response
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error fetching books:', error);
      // Return empty array if backend is not available
      if (error.code === 500 || error.message?.includes('Network Error') || error.message?.includes('ECONNREFUSED')) {
        console.warn('Backend not available, returning empty array');
        return [];
      }
      throw error;
    }
  },

  // Get book by ID
  getBookById: async (id: string): Promise<Book> => {
    try {
      const response = await apiClient.get<Book>(`/books/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error);
      throw error;
    }
  },

  // Create new book
  createBook: async (bookData: CreateBookDto): Promise<Book> => {
    try {
      const response = await apiClient.post<Book>('/books', bookData);
      return response;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  // Update book
  updateBook: async (id: string, bookData: UpdateBookDto): Promise<Book> => {
    try {
      const response = await apiClient.patch<Book>(`/books/${id}`, bookData);
      return response;
    } catch (error) {
      console.error(`Error updating book ${id}:`, error);
      throw error;
    }
  },

  // Delete book
  deleteBook: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/books/${id}`);
    } catch (error) {
      console.error(`Error deleting book ${id}:`, error);
      throw error;
    }
  },

  // Search books
  searchBooks: async (query: string): Promise<Book[]> => {
    try {
      const response = await apiClient.get<Book[]>(`/books?search=${encodeURIComponent(query)}`);
      return response;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  },
};
