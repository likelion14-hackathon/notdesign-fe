import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // 라우트 정의 파일은 컴포넌트가 아니라 RouteObject 배열을 내보냅니다.
    // lazy()로 만든 컴포넌트를 담고 있어 react-refresh 규칙이 오탐합니다.
    files: ['src/features/*/*Routes.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
