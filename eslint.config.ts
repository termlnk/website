import antfu from '@antfu/eslint-config';
import reactHooks from 'eslint-plugin-react-hooks';

export default antfu(
  {
    stylistic: {
      indent: 2,
      semi: true,
    },
    regexp: false,
    react: true,
    markdown: false,
    typescript: true,
    formatters: {
      css: true,
      html: true,
    },
    rules: {
      'no-useless-call': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'no-async-promise-executor': 'off',

      curly: ['error', 'multi-line'],
      'antfu/if-newline': 'off',
      'no-param-reassign': 'off',
      'eol-last': ['error', 'always'],
      'no-empty-function': 'off',
      'no-alert': 'off',

      'ts/no-explicit-any': 'off',
      'ts/no-redeclare': 'off',
      'ts/method-signature-style': 'off',

      'style/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
      'style/jsx-first-prop-new-line': ['warn', 'multiline'],
      'style/arrow-parens': ['error', 'always'],
      'style/spaced-comment': 'off',
      'style/indent-binary-ops': 'off',
      'style/operator-linebreak': 'off',
      'style/indent': ['error', 2, {
        ObjectExpression: 'first',
        SwitchCase: 1,
        ignoreComments: true,
      }],
      'style/quotes': ['warn', 'single', { avoidEscape: true }],
      'style/jsx-closing-tag-location': 'warn',
      'style/jsx-curly-newline': ['warn', { multiline: 'forbid', singleline: 'forbid' }],
      'style/jsx-wrap-multilines': 'warn',
      'style/quote-props': ['warn', 'as-needed'],
      'style/jsx-curly-brace-presence': 'warn',
      'style/multiline-ternary': 'warn',
      'style/jsx-indent-props': ['warn', 2],

      'style/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        enums: 'always-multiline',
        functions: 'never',
      }],

      'unicorn/filename-case': ['error', {
        cases: { kebabCase: true, pascalCase: true },
      }],

      'style/jsx-self-closing-comp': ['error', { component: true, html: true }],
      'react-refresh/only-export-components': 'off',

      'sort-imports': ['error', {
        allowSeparatedGroups: false,
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      }],
      'perfectionist/sort-imports': 'warn',
      'perfectionist/sort-named-exports': 'warn',
      'perfectionist/sort-exports': 'error',

      'unused-imports/no-unused-vars': 'warn',
      'antfu/top-level-function': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/no-use-before-define': 'warn',
    },
  },
  {
    plugins: {
      'react-hooks': reactHooks,
    },
  }
);
