// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import common from 'public/locales/en/common.json';
import data from 'public/locales/en/data.json';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: 'common';
    // custom resources type
    resources: {
      common: typeof common;
      data: typeof data;
    };
  }
}
