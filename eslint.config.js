import jannchie from '@jannchie/eslint-config'

export default jannchie({
  unocss: true,
  ignores: ['app/api/v3/**'],
}, {
  rules: {
    'style/indent-binary-ops': 'off',
    'style/indent': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
})
