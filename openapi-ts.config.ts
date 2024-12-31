import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'https://api.codetime.dev/v3/openapi.json',
  output: 'api/v3',
})
