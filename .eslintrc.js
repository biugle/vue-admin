/*
 * @Author: HxB
 * @Date: 2022-05-12 16:59:14
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-24 11:55:57
 * @Description: eslint 配置文件
 * @FilePath: \vue-admin\.eslintrc.js
 */
const { eslintRules } = require('js-xxx');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['prettier', 'eslint:recommended', 'plugin:vue/essential', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['prettier', 'vue', '@typescript-eslint', 'spellcheck', 'import', 'zob'],
  rules: eslintRules([], { 'vue/multi-word-component-names': 'warn', 'vue/no-v-model-argument': 'warn' }),
};
