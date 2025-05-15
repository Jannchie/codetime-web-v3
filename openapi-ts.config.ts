import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://api.codetime.dev/v3/docs/openapi.json',
  output: 'api/v3',
  plugins: ['@hey-api/client-fetch'],
})
