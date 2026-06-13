const playwright = require('eslint-plugin-playwright');

module.exports = [
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.{js,ts}'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-conditional-in-test': 'off', // Allowed in Page Objects
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
        exports: 'readonly',
        Math: 'readonly',
        String: 'readonly',
        Date: 'readonly',
        setTimeout: 'readonly',
        Promise: 'readonly',
      },
    },
  },
  {
    files: ['playwright.config.js'],
    languageOptions: {
      sourceType: 'module',
    },
  }
];
