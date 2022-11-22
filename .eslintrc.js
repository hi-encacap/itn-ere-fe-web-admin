module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['src/reportWebVitals.*', 'src/*.test.*', 'src/**/*Test*.*', 'src/**/*.d.ts'],
  overrides: [
    {
      files: ['*Slice.{ts,tsx,js,jsx}'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'index', 'sibling'], 'object'],
        pathGroups: [
          {
            pattern: '**/app/Slices',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '**/app/Services',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
};
