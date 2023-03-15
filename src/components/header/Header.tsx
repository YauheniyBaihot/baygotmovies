import { LanguageSwitcher } from '@/components/language-switcher/LanguageSwitcher';
import { MediaQueryVideo } from '@/components/media-query-video/MediaQueryVideo';
import { Navigation } from '@/components/navigation/Navigation';
import { SocialLinks } from '@/components/social-links/SocialLinks';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import dynamic from 'next/dynamic';

import variables from '@/styles/Variables.module.scss';

type HeaderProps = {};

export function Header(props: HeaderProps) {
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

  const sources = [
    {
      query: `(min-width: ${variables.mediaSm})`,
      path: '/backgrounds/2.mp4',
    },
    {
      query: '(min-width: 300px)',
      path: '/video/video.mp4',
    },
  ];

  return (
    <header className={styles.header} id="home">
      <MediaQueryVideo sources={sources} cover={'sdad'} />

      <div className={styles.navigation}>
        <Navigation className={styles.navigation} items={[]} />
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLang}
          onChange={changeLanguage}
        />
      </div>

      <a className={styles.pageTitle} href="./">
        baygotfilm {variables.mediaSm}
      </a>
      <div className={styles.contacts}>
        <SocialLinks className={styles.contacts} items={[]} />

        {/*<LanguageSwitcher*/}
        {/*  languages={languages}*/}
        {/*  currentLanguage={currentLang}*/}
        {/*  onChange={changeLanguage}*/}
        {/*></LanguageSwitcher>*/}
      </div>

      <h1 className={styles.coolText}>
        The moments are fleeting
        <br />
        let’s capture them together
      </h1>

      <div className={styles.overlay}></div>
    </header>
  );
}
