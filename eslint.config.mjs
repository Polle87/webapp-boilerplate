import eslint from '@eslint/js';
import jsonc from 'eslint-plugin-jsonc';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['**/dist/**', '**/coverage/**', '**/tests/reports/**', '**/tests/results/**'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...vue.configs['flat/recommended'],
    ...jsonc.configs['flat/recommended-with-jsonc'],
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'prettier/prettier': 'error',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            'no-constant-binary-expression': 'error',
            'no-duplicate-imports': 'error',
            'no-eval': 'error',
            'no-new-func': 'error',
            'no-script-url': 'error',
            'no-param-reassign': ['error', { props: false }],
            'prefer-promise-reject-errors': 'error',
            'no-console': 'warn',
            'dot-notation': 'off',
            '@typescript-eslint/no-require-imports': 'error',
            'vue/multi-word-component-names': 'off',
        },
        plugins: {
            prettier: prettierPlugin,
        },
    },
    {
        files: ['apps/frontend/**/*.{ts,tsx,vue}'],
        rules: {
            'no-alert': 'error',
        },
    },
    {
        files: ['**/*.vue'],
        rules: {
            'vue/no-v-html': 'error',
            'vue/require-explicit-emits': 'error',
        },
    },
    {
        files: [
            'apps/backend/src/**/*.{ts,tsx}',
            'apps/frontend/src/**/*.{ts,tsx,vue}',
            'apps/shared/src/**/*.{ts,tsx}',
        ],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                projectService: true,
                extraFileExtensions: ['.vue'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                { accessibility: 'explicit' },
            ],
            '@typescript-eslint/dot-notation': 'error',
            '@typescript-eslint/require-array-sort-compare': 'error',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/no-unsafe-type-assertion': 'error',
            '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
            '@typescript-eslint/no-deprecated': 'error',
            '@typescript-eslint/no-base-to-string': 'error',
            '@typescript-eslint/no-confusing-void-expression': 'error',
            '@typescript-eslint/no-unnecessary-template-expression': 'error',
            '@typescript-eslint/no-misused-spread': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/strict-boolean-expressions': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/no-unsafe-enum-comparison': 'error',
            '@typescript-eslint/only-throw-error': 'error',
            '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
        },
    },
    {
        files: ['**/*.{json,jsonc,json5}'],
        rules: {
            'prettier/prettier': 'error',
        },
        plugins: {
            prettier: prettierPlugin,
        },
    },
    prettier,
];
