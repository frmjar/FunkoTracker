module.exports = [
  {
    ...require('next'),
    ...require('eslint-config-love'),
    files: ['**/*.js', '**/*.ts'],
    ignores: ['**/.next/**/*', '**/.next/*', '**/*.config.ts', '**/*.config.js'],
    rules: {
      "string-boolean-expression": "off",
      "semi":  ["error", "never"],
      "no-trailling-spaces": "error",
      "comma-dangle": ["error", "never"],
    }
  },
]