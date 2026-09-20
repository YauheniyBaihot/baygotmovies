import '@mantine/carousel/styles.layer.css';
import {ColorSchemeScript, MantineProvider, mantineHtmlProps} from '@mantine/core';
import '@mantine/core/styles.layer.css';
import type {Metadata, Viewport} from 'next';
import {I18nProvider} from 'next-i18next/client';
import {generateI18nStaticParams, getResources, getT, initServerI18next} from 'next-i18next/server';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import {FC, PropsWithChildren} from 'react';

import {Footer} from '@/components/footer/Footer';
import {siteBlocks} from '@/data';
import i18nConfig from '@/i18n.config';
import '@/styles/global.css';
import {theme} from '@/styles/theme';

initServerI18next(i18nConfig);

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
  return generateI18nStaticParams();
}

export default RootLayout;
