import type {I18nConfig} from 'next-i18next/proxy';

const resourceLoader: I18nConfig['resourceLoader'] =
  process.env.NODE_ENV === 'development'
    ? async (lng, ns) => {
        const fs = await import('node:fs/promises')
        const path = await import('path')
        const content = await fs.readFile(
          path.resolve(process.cwd(), `app/i18n/locales/${lng}/${ns}.json`),
          'utf-8'
        )
        return JSON.parse(content)
      }
    : (lng, ns) => import(`./app/i18n/locales/${lng}/${ns}.json`)


const i18nConfig: I18nConfig = {
  supportedLngs: ['en'],
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'data'],
  localeParamName: 'locale',
  hideDefaultLocale: true,
  localeInPath: true,
  resourceLoader: (language, namespace) =>
    import(`./app/i18n/locales/${language}/${namespace}.json`),
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};

export default i18nConfig;
