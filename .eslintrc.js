module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "src/reportWebVitals.*",
    "src/*.test.*",
    "src/**/*Test*.*",
    "src/**/*.d.ts",
    ".eslintrc.js",
    "*.config.*",
  ],
  overrides: [
    {
      files: ["*Slice.{ts,tsx,js,jsx}"],
      rules: {
        "no-param-reassign": "off",
      },
    },
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreVoid: true,
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "import/order": [
      2,
      {
        groups: ["builtin", "external", "internal", ["parent", "index", "sibling"], "object"],
        pathGroups: [
          {
            pattern: "@{constants,services,slices,interfaces}/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@components/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@common/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@{hooks,utils}/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@locales/**",
            group: "external",
            position: "after",
          },
          {
            pattern: "@admin/**",
            group: "external",
            position: "after",
          },
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
};
