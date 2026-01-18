import { defineConfig } from 'orval'

export default defineConfig({
  backend: {
    input: {
      target: 'http://backend:8000/openapi.json',
    },
    output: {
      target: 'app/openapi/backend.ts',
      client: 'swr',
    },
  },
})
