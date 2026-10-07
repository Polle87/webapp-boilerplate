import eslint from '@eslint/js'
import jsonc from 'eslint-plugin-jsonc'
import playwright from 'eslint-plugin-playwright'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import vue from 'eslint-plugin-vue'
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const typedFiles = ['**/*.{ts,tsx,mts,cts,vue}']

export default [
    {
        ignores: ['**/dist/**', '**/coverage/**', '**/tests/reports/**', '**/tests/results/**'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked.map((config) => ({
        ...config,
        files: typedFiles,
    })),
    ...tseslint.configs.stylisticTypeChecked.map((config) => ({
        ...config,
        files: typedFiles,
    })),
    ...vue.configs['flat/recommended'],
    ...vuejsAccessibility.configs['flat/recommended'],
    ...jsonc.configs['flat/recommended-with-jsonc'],
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
        rules: {
            'prettier/prettier': 'error',
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'no-constant-binary-expression': 'error',
            'no-duplicate-imports': 'error',
            'no-eval': 'error',
            'no-new-func': 'error',
            'no-promise-executor-return': 'error',
            'require-atomic-updates': 'error',
            'no-script-url': 'error',
            'no-param-reassign': ['error', { props: false }],
            'prefer-promise-reject-errors': 'error',
            'no-console': 'warn',
            'vue/multi-word-component-names': ['error', { ignores: ['App'] }],
        },
        plugins: {
            prettier: prettierPlugin,
        },
    },
    {
        files: [
            'eslint.config.{js,mjs,cjs}',
            '**/*.config.{js,mjs,cjs,ts,mts,cts}',
            'apps/backend/**/*.{js,mjs,cjs,ts,tsx,mts,cts}',
            'tests/api/**/*.{js,mjs,cjs,ts,tsx,mts,cts}',
            'tests/playwright.*.config.ts',
        ],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ['apps/frontend/src/**/*.{ts,tsx,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'no-alert': 'error',
        },
    },
    {
        files: ['tests/e2e/**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
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
        files: typedFiles,
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                projectService: true,
                extraFileExtensions: ['.vue'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'dot-notation': 'off',
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/require-array-sort-compare': 'error',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/no-unsafe-type-assertion': 'error',
            '@typescript-eslint/return-await': ['error', 'in-try-catch'],
            '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
            '@typescript-eslint/no-confusing-void-expression': 'error',
            '@typescript-eslint/no-unnecessary-template-expression': 'error',
            '@typescript-eslint/no-misused-spread': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/{api,e2e}/**/*.ts'],
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
]
