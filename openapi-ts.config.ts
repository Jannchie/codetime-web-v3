import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://test.codetime.dev/v3/docs/openapi.json',
  output: {
    path: 'app/api/v3',
  },
  plugins: [
    '@hey-api/schemas',
    {
      dates: true,
      name: '@hey-api/transformers',
    },
    {
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
  ],
})
