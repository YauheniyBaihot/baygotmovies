import type {I18nConfig} from 'next-i18next/proxy';

const resourceLoader: I18nConfig['resourceLoader'] = (lng, ns) => import(`./app/i18n/locales/${lng}/${ns}.json`);

const i18nConfig: I18nConfig = {
  supportedLngs: ['en'],
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'data'],
  localeParamName: 'locale',
  hideDefaultLocale: true,
  localeInPath: true,
  resourceLoader,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

export default i18nConfig;
