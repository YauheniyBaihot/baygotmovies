import {Title} from '@mantine/core';
import {useElementSize, useIntersection, useMergedRef} from '@mantine/hooks';
import {Trans, useTranslation} from 'next-i18next';
import {FC, useEffect, useMemo, useRef, useState} from 'react';

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
const availableHeights = [ 1080, 540, 270, 135];

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
  if (actualHeight === 0) return undefined;

  const actualAspectRatio = height === 0 ? 1 : width / height;

  return `${videosSrcPrefix}${source}_${closestAspectRatio(actualAspectRatio)}_${closestHeight(actualHeight)}.webm`;
};

const mainVideoSource = 'mainVideo2/video';

export const HeaderWithVideo: FC<HeaderProps> = ({sections}) => {
  const {t} = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  const {ref: elementSizeRef, height, width} = useElementSize();

  // Load and play when at least 5% of the video is visible
  const {ref: intersectionRef, entry} = useIntersection<HTMLDivElement>({
    threshold: 0.05,
  });

  const mergedRef = useMergedRef(elementSizeRef, intersectionRef);

  const [src, setSrc] = useState(calculateSrc(mainVideoSource, width, height, height));

  useEffect(() => {
    const actualContainerHeight = height * window.devicePixelRatio;
    setSrc(calculateSrc(mainVideoSource, width, height, actualContainerHeight));
  }, [height, width]);

  const isIntersecting = !!entry?.isIntersecting;
  const videoSrc = isIntersecting ? src : undefined;

  // Control playback based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isIntersecting) {
        videoRef.current.play().catch(err => {
          console.warn('Playback prevented:', err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isIntersecting]);

  // Explicitly release media resources and decoders on iOS Safari when scrolled out of view
  useEffect(() => {
    console.log('here we go');
    if (videoRef.current && !videoSrc) {
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, [videoSrc]);

  return useMemo(() => {
    return (
      <header ref={mergedRef} className={styles.header}>
        <video ref={videoRef} className={styles.backgroundVideo} src={videoSrc} playsInline muted preload="auto" loop />

        <SiteLogo color="main-white" className={styles.logo} />

        <SocialLinks className={styles.contacts} color="main-white" />

        <ContactMeButton className={styles.contactMe} variant="main-inversed" />

        <NavigationMenu className={styles.menu} sections={sections} />

        <Title className={styles.title} c="main-white">
          <Trans t={t} i18nKey="header.title" components={{1: <br />}} />
        </Title>
      </header>
    );
  }, [mergedRef, videoSrc, sections, t]);
};
