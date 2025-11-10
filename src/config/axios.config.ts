import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

// const headers = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
// }

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  instance.interceptors.request.use(
    (
      config: InternalAxiosRequestConfig<{
        token?: string;
      }>
    ) => {
      // Rewrite /progressReport paths to /functions/v1/progress-report
      if (config.url?.startsWith("/progressReport")) {
        config.url = config.url.replace(
          "/progressReport",
          "/functions/v1/progress-report"
        );
      }
      // Rewrite /initiativeProfile paths to /functions/v1/initiative-profile
      if (config.url?.startsWith("/initiativeProfile")) {
        config.url = config.url.replace(
          "/initiativeProfile",
          "/functions/v1/initiative-profile"
        );
      }
      // Rewrite /participant paths to /functions/v1/participant
      if (config.url?.startsWith("/participant")) {
        config.url = config.url.replace(
          "/participant",
          "/functions/v1/participant"
        );
      }
      // Rewrite /dropdown/accounts paths to /functions/v1/dropdown-accounts
      if (config.url?.startsWith("/dropdown/accounts")) {
        config.url = config.url.replace(
          "/dropdown/accounts",
          "/functions/v1/dropdown-accounts"
        );
      }
      // Rewrite /account paths to /functions/v1/account
      if (config.url?.startsWith("/account")) {
        config.url = config.url.replace("/account", "/functions/v1/account");
      }

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
