﻿import {Title} from '@mantine/core';
import {useElementSize} from '@mantine/hooks';
import {Trans, useTranslation} from 'next-i18next';
import {FC, useEffect, useMemo, useRef, useState} from 'react';

import {AutoPlayVideo, AutoPlayVideoPropsRef} from '@/components/auto-play-video/AutoPlayVideo';
import {ContactMeButton} from '@/components/contact-me-button/ContactMeButton';
import {NavigationMenu} from '@/components/navigation-menu/NavigationMenu';
import {SiteLogo} from '@/components/site-logo/SiteLogo';
import {SocialLinks} from '@/components/social-links/SocialLinks';
import {NavigationSection} from '@/models/site-block';

import styles from './HeaderWithVideo.module.css';

type HeaderProps = {
  sections: NavigationSection[];
};

const mainVideoAspectRatios = {
  '9-16': 9 / 16,
  '1-1': 1,
  '16-9': 16 / 9,
};
const availableHeights = [2160, 1080, 540, 270, 135];

const videosSrcPrefix = process.env.NEXT_PUBLIC_VIDEOS_SRC_PREFIX ?? '';

const closestHeight = (height: number) => {
  let index = 1;

  while (availableHeights[index] >= height && index < availableHeights.length - 1) index++;

  return availableHeights[index - 1];
};

const closestAspectRatio = (actualAspectRatio: number) => {
  return Object.entries(mainVideoAspectRatios).reduce((prev, curr) => {
    return Math.abs(curr[1] - actualAspectRatio) < Math.abs(prev[1] - actualAspectRatio) ? curr : prev;
  })[0];
};

const calculateSrc = (source: string, width: number, height: number, actualHeight: number) => {
  const actualAspectRatio = height === 0 ? 1 : width / height;

  return `${videosSrcPrefix}${source}_${closestAspectRatio(actualAspectRatio)}_${closestHeight(actualHeight)}.webm`;
};

const mainVideoSource = 'mainVideo/video';

export const HeaderWithVideo: FC<HeaderProps> = ({sections}) => {
  const {t} = useTranslation();
  const {ref, height, width} = useElementSize();
  const [src, setSrc] = useState(calculateSrc(mainVideoSource, width, height, height));
  const autoVideoRef = useRef<AutoPlayVideoPropsRef>(null);

  useEffect(() => {
    const actualContainerHeight = height * window.devicePixelRatio;
    setSrc(calculateSrc(mainVideoSource, width, height, actualContainerHeight));
  }, [height, width]);

  const playVideo = () => {
    autoVideoRef.current?.play();
  };

  return useMemo(() => {
    return (
      <header ref={ref} className={styles.header} onClick={playVideo}>
        <AutoPlayVideo ref={autoVideoRef} className={styles.backgroundVideo} src={src} loop muted playsInline preload="auto" />

        <SiteLogo color="main-white" className={styles.logo} />

        <SocialLinks className={styles.contacts} color="main-white" />

        <ContactMeButton className={styles.contactMe} variant="main-inversed" />

        <NavigationMenu className={styles.menu} sections={sections} />

        <Title className={styles.title} c="main-white">
          <Trans t={t} i18nKey="header.title" components={{1: <br />}} />
        </Title>
      </header>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, sections, src]);
};
