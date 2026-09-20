import {ColorSchemeScript, mantineHtmlProps,MantineProvider} from '@mantine/core';
import type {Metadata, Viewport} from 'next';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import {FC, PropsWithChildren} from 'react';
import { initServerI18next, getT, getResources, generateI18nStaticParams } from 'next-i18next/server'
import { I18nProvider } from 'next-i18next/client'

import {siteBlocks} from '@/data';
import {theme} from '@/styles/theme';
import i18nConfig from '@/i18n.config'
import { Footer } from '@/components/footer/Footer';

import '@mantine/core/styles.layer.css';
import '@mantine/carousel/styles.layer.css';
import '@/styles/global.css';

initServerI18next(i18nConfig)

type RootLayoutProps = PropsWithChildren<{
  params: Promise<{locale: string}>;
}>;

const RootLayout: FC<RootLayoutProps> = async ({children, params}) => {
  const {locale} = await params;

  if (!i18nConfig.supportedLngs.includes(locale)) {
    notFound();
  }

  const {i18n} = await getT();
  const resources = getResources(i18n);
  const sections = siteBlocks.map(({path, nameKey}) => ({path, nameKey}));

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      </head>
      <body>
         <I18nProvider language={locale} resources={resources}>
          <MantineProvider theme={theme} defaultColorScheme="auto">
             {children}
            <Footer sections={sections} />
          </MantineProvider>
        </I18nProvider>
      </body>
    </html>
  );
};


export const metadata: Metadata = {
  title: 'Baygotmovies',
  description: 'Wedding videographer, Alena',
  icons: {
    icon: [
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};


export async function generateStaticParams() {
  return generateI18nStaticParams()
}

export default RootLayout;
