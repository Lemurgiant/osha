/// <reference types="vite/client" />

interface Window {
  storage: {
    get: (key: string) => Promise<unknown>
    set: (key: string, value: unknown) => Promise<void>
  }
}
