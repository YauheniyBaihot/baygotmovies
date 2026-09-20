import {FlatCompat} from '@eslint/eslintrc';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...compat.config({
    extends: ['plugin:prettier/recommended'],
  }),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.prettierrc.cjs'],
    settings: {react: {version: '19.3.0'}},
  },
];
export default eslintConfig;
