const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      'dist/*',
      'node_modules',
      'coverage',
      '.expo',
      'expo-env.d.ts',
      'ios',
      'android',
      '.husky',
    ],
  },
]);
