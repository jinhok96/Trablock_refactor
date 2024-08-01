module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import', '@stylistic'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'no-nested-ternary': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // @stylistic 규칙 설정
    '@stylistic/semi': ['error', 'always'], // semi: true
    '@stylistic/quotes': ['error', 'single'], // singleQuote: true
    '@stylistic/indent': ['error', 2], // tabWidth: 2
    '@stylistic/no-tabs': 'error', // useTabs: false
    '@stylistic/comma-dangle': ['error', 'never'], // trailingComma: 'none'
    '@stylistic/object-curly-spacing': ['error', 'always'], // bracketSpacing: true
    '@stylistic/arrow-parens': ['error', 'always'], // arrowParens: 'always'
    '@stylistic/linebreak-style': 'off', // endOfLine: 'auto'
    '@stylistic/max-len': 'off', // printWidth: 120이지만 에러는 발생시키지 않음. prettier에서 가능한 경우 포맷팅만 함
    // Prettier와 충돌할 수 있는 다른 @stylistic 규칙들은 비활성화
    '@stylistic/no-mixed-operators': 'off',
    '@stylistic/no-confusing-arrow': 'off',
    '@stylistic/newline-per-chained-call': 'off',
    '@stylistic/array-bracket-newline': 'off',
    '@stylistic/array-element-newline': 'off',
    '@stylistic/object-curly-newline': 'off',
    '@stylistic/function-paren-newline': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'unknown'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'react*,react*/**',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/**/*',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      },
      alias: {
        map: [
          ['@/apis', './src/apis'],
          ['@/app', './src/app'],
          ['@/components', './src/components'],
          ['@/constants', './src/libs/constants'],
          ['@/contexts', './src/libs/contexts'],
          ['@/hooks', './src/libs/hooks'],
          ['@/utils', './src/libs/utils'],
          ['@/styles', './src/styles'],
          ['@/fonts', './public/fonts'],
          ['@/icons', './public/icons'],
          ['@/images', './public/images']
        ],
        extensions: ['.ts', '.tsx']
      }
    }
  },
  ignorePatterns: ['.eslintrc.js', 'firebaseConfig.js']
};
