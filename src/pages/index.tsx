import Head from 'next/head';
import { MediaQueryVideo } from '@/components/media-query-video/MediaQueryVideo';
import { SocialLinks } from '@/components/social-links/SocialLinks';
import styles from '@/components/header/Header.module.scss';
import { HeaderWithVideo } from '@/components/header-with-video/HeaderWithVideo';

// TODO: set viewport, favicon, description
export default function Home() {
  const socialMedias = [
    {
      path: 'https://www.instagram.com/baygot_movies/',
      variant: 'instagram',
    },
    {
      path: 'https://t.me/fraubaygot',
      variant: 'telegram',
    },
    {
      path: 'https://m.me/baygotmovies',
      variant: 'messenger',
    },
    {
      path: 'https://wa.me/37068413646',
      variant: 'whatsapp',
    },
  ];


  return (
    <>
      <Head>
        <title>baygotmovies</title>
        <meta name="description" content="Wedding videographer, Alena" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <HeaderWithVideo />
      <div id="weddings" style={{
        height: '200vh',
        textAlign: 'center',
        fontSize: '100px',
      }}> Weddings
      </div>

      <div id="love-story" style={{
        height: '100vh',
        textAlign: 'center',
        fontSize: '100px',
      }}> Love story
      </div>

      <div id="santorini" style={{
        height: '100vh',
        textAlign: 'center',
        fontSize: '100px',
      }}> Santorini
      </div>

      <div id="other-works" style={{
        height: '100vh',
        textAlign: 'center',
        fontSize: '100px',
      }}> Other works
      </div>

      {/*<AboutMe />*/}
      {/*<Weddings items={[]} />*/}
      {/*<Films items={[]} />*/}
      {/*<Footer />*/}

      {/*<div*/}
      {/*  style={{*/}
      {/*    fontSize: '80px',*/}
      {/*    textAlign: 'center',*/}
      {/*    scrollSnapType: 'y mandatory',*/}
      {/*    overflowY: 'scroll',*/}
      {/*    height: '100vh',*/}
      {/*    scrollBehavior: 'smooth',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <div style={{ height: '100vh', scrollSnapAlign: 'start' }} id="weddings">*/}
      {/*    First block*/}
      {/*  </div>*/}
      {/*  <div style={{ height: '300vh', scrollSnapAlign: 'start' }} id="santorini">*/}
      {/*    Second block*/}
      {/*  </div>*/}
      {/*  <div style={{ height: '100vh', scrollSnapAlign: 'start' }} id="love-stories">*/}
      {/*    Third block*/}
      {/*  </div>*/}
      {/*  <div style={{ height: '100vh', scrollSnapAlign: 'start' }} id="other-works">*/}
      {/*    Last block*/}
      {/*  </div>*/}
      {/*  <div style={{ height: '200px', scrollSnapAlign: 'start' }}>Footer</div>*/}
      {/*</div>*/}


      {/*<div style={{*/}
      {/*  display: 'grid',*/}
      {/*  height: '100vh',*/}
      {/*  gridTemplateRows: ''*/}
      {/*  gridTemplateColumns: '',*/}
      {/*  */}
      {/*}}>*/}
      {/*  <div>*/}
      {/*    BaygotMovies*/}
      {/*  </div>*/}
      {/*  <div style={{ fontSize: '24px' }}>*/}
      {/*    <SocialLinks items={socialMedias} />*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <button style={{*/}
      {/*      padding: '4px 8px',*/}
      {/*      borderRadius: '30px',*/}
      {/*      fontSize: '16px',*/}
      {/*      border: 'none',*/}
      {/*      color: '#0E0D0D',*/}
      {/*      background: '#F6F3F3',*/}

      {/*    }}> Contact me*/}
      {/*    </button>*/}
      {/*  </div>*/}

      {/*  <div>*/}
      {/*    Menu*/}
      {/*  </div>*/}

      {/*  <div>*/}
      {/*    A heartwarming Wedding movie about You and Your loved ones*/}
      {/*  </div>*/}

      {/*  <video*/}
      {/*    style={{ width: '500px', height: '500px' }}*/}
      {/*    src="/main-video.mp4"*/}
      {/*    autoPlay*/}
      {/*    loop*/}
      {/*    muted*/}
      {/*    playsInline*/}
      {/*    preload="auto"*/}
      {/*  />*/}
      {/*</div>*/}
    </>
  );
}
