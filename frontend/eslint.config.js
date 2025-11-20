import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: typescriptParser,
      globals: {
        browser: true,
      },
    },
    ignores: ['dist', 'eslint.config.js'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...typescriptPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
];
