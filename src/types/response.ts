export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}
