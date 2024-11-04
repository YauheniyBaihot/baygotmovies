// @ts-check

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'lt'],
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/public/locales',
};
