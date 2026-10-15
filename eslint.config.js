import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import-x';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const sortGroups = [
    'type', // Type imports (e.g., TypeScript types)
    'builtin', // Built-in modules (e.g., fs, path)
    'object', // Namespace imports (e.g., import * as fs from 'fs')
    'external', // External dependencies (e.g., lodash)
    'internal', // Internal imports (e.g., your project's base paths)
    'parent', // Parent imports (e.g., ../)
    'sibling', // Sibling imports (e.g., ./file)
    'index', // Index file imports (e.g., ./)
];

const sortingConfigs = [
    // '~/**',
];

export default [
    { ignores: ['dist'] },
    js.configs.recommended,
    reactHooks.configs.flat['recommended-latest'],
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            'import/order': [
                'warn',
                {
                    pathGroups: [
                        {
                            group: 'external',
                            position: 'after',
                            pattern: '~/**',
                        },
                        ...sortingConfigs.map((item) => ({
                            group: 'internal',
                            position: 'after',
                            pattern: item,
                        })),
                    ],
                    'newlines-between': 'always',
                    groups: sortGroups,
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'object-curly-newline': [
                'error',
                {
                    ObjectExpression: {
                        multiline: true,
                        minProperties: 2, // objects with 3+ props must be multiline
                        consistent: true, // allow `{ a, b } || {}` style
                    },
                    ObjectPattern: { multiline: true },
                },
            ],
        },
    },
    // Keep last: turns off stylistic ESLint rules that would fight Prettier's formatting.
    eslintConfigPrettier,
];
