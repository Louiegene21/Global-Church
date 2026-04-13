/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP: string
  readonly VITE_BASE_URL: string
  readonly VITE_PUBLIC_URL: string
  readonly VITE_PORT: string
  readonly VITE_AUTH_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
