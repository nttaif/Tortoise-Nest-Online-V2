export interface ApiRequestOptions {
  headers?: Record<string, string>;
  data?: any;
  params?: Record<string, unknown> & ApiQueryParams;
  isRest?: boolean;
}

export interface ApiQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
}