// Book entity types based on backend Book entity
export interface Book {
  book_id: string;
  title: string;
  author_id: string;
  description?: string;
  published_year: number;
  is_deleted: boolean;
  created_date: Date;
  created_from?: string;
  created_by?: string;
  created_name?: string;
  modified_date: Date;
  modified_from?: string;
  modified_by?: string;
  modified_name?: string;
}

// Book with author information for display
export interface BookWithAuthor extends Book {
  author: {
    author_id: string;
    name: string;
  };
}

// Create book DTO for API requests
export interface CreateBookDto {
  title: string;
  description?: string;
  author_id: string;
  published_year: number;
}

// Update book DTO for API requests
export interface UpdateBookDto {
  title?: string;
  description?: string;
  author_id?: string;
  published_year?: number;
}

// Book form data for forms
export interface BookFormData {
  title: string;
  description: string;
  author_id: string;
  published_year: number;
}

// Book list item for display in lists
export interface BookListItem {
  book_id: string;
  title: string;
  author_name: string;
  published_year: number;
  description?: string;
}
