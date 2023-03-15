import 'normalize.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Cormorant, Nunito } from 'next/font/google';

// heading font
const headingFont = Cormorant({
  subsets: ['latin'],
  variable: '--heading-font',
});
// main font
const mainFont = Nunito({
  subsets: ['latin'],
  variable: '--main-font',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${headingFont.variable} ${mainFont.variable}`}>
      <Component {...pageProps} />;
    </div>
  );
}
