/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Define env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly glob: (pattern: string) => Record<string, () => Promise<any>>;
} 