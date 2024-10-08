/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE_URL: string;
  VITE_API_KEY: string;
  // Tambahkan variabel lingkungan lain yang Anda gunakan
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
