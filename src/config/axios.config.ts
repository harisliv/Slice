import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig
} from 'axios';

// const headers = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
// }

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });

  instance.interceptors.request.use(
    (
      config: InternalAxiosRequestConfig<{
        token?: string;
      }>
    ) => {
      // Add Supabase anon key as default Authorization header
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (supabaseAnonKey) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${supabaseAnonKey}`;
      }

      // Override with custom token if provided
      if (config.headers?.token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${config.headers.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export const apiClient = createAxiosInstance();
