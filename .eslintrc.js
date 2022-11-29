module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [],
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
  ignorePatterns: [
    'src/reportWebVitals.*',
    'src/*.test.*',
    'src/**/*Test*.*',
    'src/**/*.d.ts',
    '.eslintrc.js',
    'tailwind.config.js',
  ],
  overrides: [
    {
      files: ['*Slice.{ts,tsx,js,jsx}'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'index', 'sibling'], 'object'],
        pathGroups: [
          {
            pattern: '**Slices/**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
