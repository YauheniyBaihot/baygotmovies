'use client';

import {MantineProvider} from '@mantine/core';
import type {Resource} from 'i18next';
import {I18nProvider} from 'next-i18next/client';
import {FC, PropsWithChildren} from 'react';

import {theme} from '@/styles/theme';

type ProvidersProps = PropsWithChildren<{
  locale: string;
  resources: Resource;
}>;

export const Providers: FC<ProvidersProps> = ({locale, resources, children}) => {
  return (
    <I18nProvider language={locale} resources={resources}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </I18nProvider>
  );
};
