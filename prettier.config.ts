import { readdirSync } from 'fs';
import { resolve } from 'path';
import { type Config } from "prettier";
import trivago from '@trivago/prettier-plugin-sort-imports';

const srcDirectories = readdirSync(resolve(resolve(), 'src'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const config: Config = {
  printWidth: 240,
  trailingComma: 'es5',
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  bracketSpacing: false,
  endOfLine: 'lf',
  arrowParens: 'avoid',
  plugins: [trivago],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', `^((${srcDirectories.join('|')})(\/.*)?)$`, '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
