import { getSession } from "next-auth/react";
import { auth } from "@/lib/auth";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiRequestOptions } from "../options/apiRequestOptions";

// Custom error class for API errors
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Type for HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Define public routes configuration without /api prefix
const PUBLIC_ROUTES = [
  '/auth/signin',
  '/courses',
  '/auth/re-verify',
  '/user',
  '/auth/verify',
  '/auth/signUp',
  '/auth/signout',
] as const;

// Helper to check if route is public
const isPublicRoute = (url: string): boolean => {
  // Remove /api prefix if it exists
  const normalizedUrl = url.replace(/^\/api/, '');
  return PUBLIC_ROUTES.some(route => {
    // Handle wildcard routes (e.g., /public/*)
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1);
      return normalizedUrl.startsWith(baseRoute);
    }
    return normalizedUrl === route;
  });
};

// Helper to get session based on environment
const getAuthSession = async () => {
  try {
    // For client-side requests
    if (typeof window !== 'undefined') {
      return await getSession();
    }
    // For server-side requests
    return await auth();
  } catch (error) {
    console.error('Session fetch error:', error);
    return null;
  }
};

// Create and configure axios instance
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000, // 30 seconds timeout
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (config) => {
      // Skip auth for public routes
      if (isPublicRoute(config.url || '')) {
        return config;
      }

      // Don't add auth headers if Authorization is manually provided
      if (config.headers?.Authorization) {
        return config;
      }

      const session = await getAuthSession();
      if (!session || !session.user || !session?.user.access_token) {
        throw new APIError('No authentication token found', 401);
      }

      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${session.user.access_token}`;
      return config;
    },
    (error) => Promise.reject(new APIError(error.message))
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
      const message = error.response?.data?.message || error.message;
      const statusCode = error.response?.status;
      throw new APIError(message, statusCode, error.response?.data);
    }
  );

  return instance;
};

/**
 * Makes an HTTP request using the specified method, URL, and options.
 *
 * @template TData - The type of the response data
 * @template TError - The type of the error response
 */
export const makeRequest = async <TData = unknown, TError = unknown>(
  method: HttpMethod,
  url: string,
  options?: ApiRequestOptions & { [key: string]: any }
): Promise<TData> => {
  const httpClient = createAxiosInstance();

  const config: AxiosRequestConfig = {
    method,
    url,
    headers: options?.headers,
    params: options?.params,
    ...(options?.isRest && { transformResponse: [] }),
    ...(method !== "GET" && method !== "DELETE" && {
      data: options?.data ?? {},
    }),
  };

  try {
    const response = await httpClient.request<TData>(config);
    return response.data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      'An unexpected error occurred',
      500,
      (error as TError)
    );
  }
};

// Export a singleton instance with convenience methods
export const api = {
  get: <TData = unknown, TError = unknown>(
    url: string,
    options?: ApiRequestOptions
  ) => makeRequest<TData, TError>("GET", url, options),

  post: <TData = unknown, TError = unknown>(
    url: string,
    options?: ApiRequestOptions
  ) => makeRequest<TData, TError>("POST", url, options),

  put: <TData = unknown, TError = unknown>(
    url: string,
    options?: ApiRequestOptions
  ) => makeRequest<TData, TError>("PUT", url, options),

  patch: <TData = unknown, TError = unknown>(
    url: string,
    options?: ApiRequestOptions
  ) => makeRequest<TData, TError>("PATCH", url, options),

  delete: <TData = unknown, TError = unknown>(
    url: string,
    options?: ApiRequestOptions
  ) => makeRequest<TData, TError>("DELETE", url, options),
};

export default api;
