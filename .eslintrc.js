/*
 * @Author: HxB
 * @Date: 2022-05-12 16:59:14
 * @LastEditors: DoubleAm
 * @LastEditTime: 2022-05-12 18:06:34
 * @Description: eslint 配置文件
 * @FilePath: \vue-admin\.eslintrc.js
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'spaced-comment': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 5 }],
    'no-mixed-spaces-and-tabs': ['error', false],
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // 'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }], // @typescript-eslint/no-unused-vars
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-irregular-whitespace': ['error', { skipStrings: true }],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-trailing-spaces': ['error', { skipBlankLines: false }],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    'vue/no-v-model-argument': 'off',
  },
};
