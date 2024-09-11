import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher';
import { MediaQueryVideo } from '@/components/media-query-video/MediaQueryVideo';
import { Navigation } from '@/components/navigation/Navigation';
import { SocialLinks } from '@/components/social-links/SocialLinks';
import { useEffect, useState } from 'react';
import styles from './HeaderWithVideo.module.scss';
import { motion } from 'framer-motion';
import CloseIcon from '@/icons/close-2.svg';


import Link from 'next/link';
import { SiteLogo } from '@/components/site-logo/SiteLogo';
import { ContactMeButton } from '@/components/contact-me-button/ContactMeButton';
import { Menu } from '@/components/menu/Menu';


type HeaderProps = {};


export function HeaderWithVideo(props: HeaderProps) {
  // TODO: move to props
  const navigationItems = [
    {
      link: '#about-me',
      text: 'About me',
    },
    {
      link: '#weddings',
      text: 'Wedding',
    },
    {
      link: '#moments',
      text: 'Moments',
    },
    {
      link: '#contact',
      text: 'Contact',
    },
  ];

  const languages = [
    {
      name: 'Русский',
      code: 'RU',
    },
    {
      name: 'Litueviskai',
      code: 'LT',
    },
    {
      name: 'English',
      code: 'EN',
    },
  ];

  const [currentLang, changeLanguage] = useState(languages[2]);

  const resolutions = [3, 2, 1];

  const aspectRatios = [
    {
      value: '(max-aspect-ratio: 1/1)',
      width: 3,
      height: 4,
      sizes: [1440, 1200, 960, 720],
    },
    {
      value: 'screen',
      width: 16,
      height: 9,
      sizes: [3840, 2560, 1920, 1280],
    },
  ];

  const sources = [];

  aspectRatios.forEach(aspectRatio => {
    resolutions.forEach(resolution => {
      const { sizes, value, width, height } = aspectRatio;

      for (let i = 0; i < sizes.length - 1; i++) {
        const next = sizes[i + 1];
        const current = sizes[i];
        sources.push({
          query: `${value} and (min-resolution: ${resolution}x) and (min-width: ${next / resolution}px)`,
          path: '/main-video.mp4', //`https://d2lbltjxdb58wg.cloudfront.net/video/background/${current}x${(current / width) * height}.mp4`,
        });
      }

      const current = sizes[sizes.length - 1];

      sources.push({
        query: `${value} and (min-resolution: ${resolution}x)`,
        path: '/main-video.mp4',//`https://d2lbltjxdb58wg.cloudfront.net/video/background/${current}x${(current / width) * height}.mp4`,
      });
    });
  });

  sources.push({
    query: ``,
    path: '/main-video.mp4',//`https://d2lbltjxdb58wg.cloudfront.net/video/background/1280x720.mp4`,
  });

  // const sources = [
  //   {
  //     query: `screen and (max-width: 720px)`,
  //     path: "https://d2lbltjxdb58wg.cloudfront.net/video/background/test.mp4"
  //   },
  //   {
  //     query: ``,
  //     path: "https://d2lbltjxdb58wg.cloudfront.net/video/background/2048x1152.mp4"
  //   }
  // ];


  const tryPlayVideo = () => {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video && video.paused) {
      void video.play();
    }
  };

  return (
    <header className={styles.header} id="home" onClick={tryPlayVideo}>
      <MediaQueryVideo sources={sources} className={styles.backgroundVideo} />

      <SiteLogo className={styles.logo} />

      <SocialLinks className={styles.contacts} />

      <ContactMeButton className={styles.contactMe} variant="white" />


      <Menu className={styles.menu} itemsClassName={styles.menuItem} />

      <h1 className={styles.title}>
        A heartwarming Wedding movie
        <br />
        about You and Your loved ones
      </h1>
    </header>
  );
}
