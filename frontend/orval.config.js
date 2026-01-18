import { defineConfig } from 'orval'

export default defineConfig({
  backend: {
    input: {
      target: 'http://localhost:8000/openapi.json',
    },
    output: {
      target: 'openapi/backend.ts',
      client: 'swr',
    },
  },
})
