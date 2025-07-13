import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://test.codetime.dev/v3/docs/openapi.json',
  output: 'api/v3',
})
