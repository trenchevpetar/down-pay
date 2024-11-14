import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser'; // Import the Vue parser
import pluginVue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'constructor-super': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,  // Use Vue parser for .vue files
      parserOptions: {
        parser: tsParser,  // Use TypeScript parser for <script> sections in .vue files
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs['flat/essential'].rules,
    },
  },
];
