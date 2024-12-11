// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'lt'],
  },
  localePath: typeof window === 'undefined' ? path.resolve('./public/locales') : '/public/locales',
};
