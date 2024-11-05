import '@mantine/carousel/styles.layer.css';
import {MantineProvider} from '@mantine/core';
import '@mantine/core/styles.layer.css';
import {UserConfig, appWithTranslation} from 'next-i18next';
import nextI18NextConfig from 'next-i18next.config';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {FC} from 'react';

import {Layout} from '@/components/layout/Layout';
import {siteBlocks} from '@/data';
import '@/styles/global.css';
import {theme} from '@/styles/theme';

const emptyInitialI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: nextI18NextConfig.i18n.defaultLocale,
    locales: nextI18NextConfig.i18n.locales,
  },
};

const sections = siteBlocks.map(({path, nameKey}) => ({path, nameKey}));

const App: FC<AppProps> = ({Component, pageProps}) => (
  <>
    <Head>
      <title>Baygotmovies</title>
      <meta name="description" content="Wedding videographer, Alena" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
    <style jsx global>{`
      html {
      }
    `}</style>

    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Layout sections={sections}>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  </>
);

export default appWithTranslation(App, emptyInitialI18NextConfig);
