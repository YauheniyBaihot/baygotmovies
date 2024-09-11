import 'normalize.css';
import '@/styles/_global.scss';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import Layout from '@/components/layout/Layout';

// action font
const actionFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
});
// main font

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
          html {
              --action-font-family: ${actionFont.style.fontFamily};
          }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
