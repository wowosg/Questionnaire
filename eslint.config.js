import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      quotes: ['warn', 'single'],
    },
  },
  ...pluginVue.configs['flat/essential'],
];
