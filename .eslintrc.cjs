/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier-vue/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['prettier', 'import'],
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'no-mixed-operators': 'off',
    'vue/html-button-has-type': 'error',
    'unicorn/prefer-includes': 'off',
    'space-before-function-paren': 'off',
    'curly': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/valid-v-slot': 'off',
    'vue/no-unused-vars': 'warn',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/consistent-type-imports': ['off'],
    "no-restricted-imports": ["error", {
      "patterns": [".*"]
    }],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        'groups': [
          'index',
          ['sibling', 'parent'],
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
      },
    ],
    'vue/v-on-event-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'prettier-vue/prettier': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
  }
}
