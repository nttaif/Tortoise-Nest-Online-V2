export interface ApiResponseList<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiResponseDetail<T> {
  data: T;
  message?: string;
}
