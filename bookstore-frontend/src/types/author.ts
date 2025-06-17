// Author entity types based on backend Author entity
export interface Author {
  author_id: string;
  name: string;
  created_date: Date;
  created_from?: string;
  created_by?: string;
  created_name?: string;
  modified_date: Date;
  modified_from?: string;
  modified_by?: string;
  modified_name?: string;
}

// Author for display (simplified)
export interface AuthorDisplay {
  author_id: string;
  name: string;
}

// Create author DTO for API requests
export interface CreateAuthorDto {
  name: string;
  source: string;
  userName: string;
  userId: string;
}

// Update author DTO for API requests
export interface UpdateAuthorDto {
  name: string;
  source: string;
  userName: string;
  userId: string;
}

// Author form data for forms
export interface AuthorFormData {
  name: string;
}

// Author list item for dropdowns and selections
export interface AuthorOption {
  value: string;
  label: string;
}
