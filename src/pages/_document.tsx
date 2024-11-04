import {ColorSchemeScript} from '@mantine/core';
import {Head, Html, Main, NextScript} from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
