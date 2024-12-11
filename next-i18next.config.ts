import {UserConfig} from 'next-i18next';
import path from 'path';

process.env.I18NEXT_DEFAULT_CONFIG_PATH = './next-i18next.config.ts';

const config: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'lt'],
  },
  localePath: typeof window === 'undefined' ? path.resolve('./public/locales') : '/public/locales',
};

export default config;
