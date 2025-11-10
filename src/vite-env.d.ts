/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_DEV_LOGS: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
