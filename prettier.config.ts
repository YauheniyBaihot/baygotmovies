import { type Config } from 'prettier';
import type { PluginConfig } from '@trivago/prettier-plugin-sort-imports';

const config: Config & PluginConfig = {
  printWidth: 240,
 trailingComma: 'es5',
 tabWidth: 2,
  singleQuote: true,
  semi: true,
  bracketSpacing: false,
  endOfLine: 'lf',
  arrowParens: 'avoid',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
