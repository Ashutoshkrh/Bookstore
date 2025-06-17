export interface CreateAuthorInterface {
  name: string;
  created_date: Date;
  created_from: string;
  created_by: string;
  created_name: string;
  modified_date: Date;
  modified_from: string;
  modified_by: string;
  modified_name: string;
}

export interface GetAuthorInterface {
  author_id: string;
  name: string;
}

export interface UpdateAuthorInterface {
  name: string;
  modified_date: Date;
  modified_from: string;
  modified_by: string;
  modified_name: string;
}
