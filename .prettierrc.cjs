const {readdirSync} = require('fs');
const path = require('path');

const srcDirectories = readdirSync(path.resolve(__dirname, 'src'), {withFileTypes: true})
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

module.exports = {
  printWidth: 240,
  trailingComma: 'es5',
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  bracketSpacing: false,
  endOfLine: 'lf',
  arrowParens: 'avoid',
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', `^((${srcDirectories.join('|')})(\/.*)?)$`, '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
