import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'https://test.codetime.dev/swagger/doc.json',
  output: 'api',
})
