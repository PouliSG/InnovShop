import eslintConfigAirbnb from 'eslint-config-airbnb';
import eslintPluginReact from 'eslint-plugin-react';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslint from 'eslint';

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
      },
    },
    plugins: {
      react: eslintPluginReact,
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      ...eslintConfigAirbnb.rules,
      "no-console": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
];
