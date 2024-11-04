import {Carousel, Embla} from '@mantine/carousel';
import {Button, Collapse, Group, Text} from '@mantine/core';
import {ParseKeys} from 'i18next';
import {useTranslation} from 'next-i18next';
import React, {FC, useMemo, useRef, useState} from 'react';

import {VideosPlayerSlide, VideosPlayerSlidePropsRef} from '@/components/videos-player/videos-player-slide/VideosPlayerSlide';
import {VideoWork} from '@/models/site-block';

import styles from './VideosPlayer.module.css';

type VideosPlayerProps = {
  videos: VideoWork[];
  opened: boolean;
  onClose: () => void;
  blockNameKey: ParseKeys<'data'>;
};

export const VideosPlayer: FC<VideosPlayerProps> = ({videos, opened, onClose, blockNameKey}) => {
  const {t} = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const mapRef = useRef<Map<string, VideosPlayerSlidePropsRef> | null>(null);

  const getMap = () => {
    if (mapRef.current === null) {
      mapRef.current = new Map<string, VideosPlayerSlidePropsRef>();
    }

    return mapRef.current;
  };

  const destroy = () => {
    if (mapRef.current) {
      mapRef.current.forEach(r => {
        r.destroy();
      });
    }
  };

  const handleClose = () => {
    onClose();
    destroy();
  };

  const handleNext = () => {
    embla?.scrollNext();
    destroy();
  };

  const handlePrev = () => {
    embla?.scrollPrev();
    destroy();
  };

  const handleTransitionEnd = () => {
    if (opened) {
      embla?.reInit();
      containerRef?.current?.scrollIntoView({behavior: 'smooth'});
    }
  };

  const slides = useMemo(() => {
    return videos.map(({nameKey, date, titleKey, youtubeIds, dateTitle}, slideIndex) => {
      return (
        <VideosPlayerSlide
          ref={newRef => {
            const map = getMap();
            if (newRef) {
              map.set(nameKey, newRef);
            } else {
              map.delete(nameKey);
            }
          }}
          key={nameKey}
          totalSlides={videos.length}
          nameKey={nameKey}
          blockNameKey={blockNameKey}
          titleKey={titleKey}
          slideIndex={slideIndex}
          youtubeIds={youtubeIds}
          date={date}
          dateTitle={dateTitle}
        />
      );
    });
  }, [blockNameKey, videos]);

  return (
    <Collapse in={opened} onTransitionEnd={handleTransitionEnd} transitionDuration={400}>
      <div className={styles.container} ref={containerRef}>
        <Carousel draggable={false} withControls={false} getEmblaApi={setEmbla} loop height="100%" style={{overflow: 'hidden'}} speed={5} slideGap="xl">
          {slides}
        </Carousel>

        <Group justify="space-between" className={styles.controlsContainer}>
          <Button onClick={handleClose}>{t('hideVideos')}</Button>
          <Group gap="0">
            <Button variant="transparent" onClick={handlePrev}>
              {t('prev')}
            </Button>
            <Text>|</Text>
            <Button variant="transparent" onClick={handleNext}>
              {t('next')}
            </Button>
          </Group>
        </Group>
      </div>
    </Collapse>
  );
};
