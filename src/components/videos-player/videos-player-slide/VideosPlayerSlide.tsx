import {CarouselSlide} from '@mantine/carousel';
import {Text, Title} from '@mantine/core';
import {ParseKeys} from 'i18next';
import {useTranslation} from 'next-i18next';
import React, {ForwardRefRenderFunction, forwardRef, useImperativeHandle, useRef} from 'react';

import {YoutubeVideo as YoutubeVideoComponent, YoutubeVideoRef} from '@/components/youtube-video/YoutubeVideo';
import {ShortDate, YoutubeVideo} from '@/models/site-block';

import styles from './VideosPlayerSlide.module.css';

type VideosPlayerSlideProps = {
  nameKey: ParseKeys<'data'>;
  date?: ShortDate;
  dateTitle?: ParseKeys<'data'>;
  titleKey: ParseKeys<'data'>;
  blockNameKey: ParseKeys<'data'>;
  slideIndex: number;
  totalSlides: number;
  youtubeIds: [YoutubeVideo, YoutubeVideo] | [YoutubeVideo];
};

export type VideosPlayerSlidePropsRef = {
  destroy: () => void;
};

const VideosPlayerSlideInternal: ForwardRefRenderFunction<VideosPlayerSlidePropsRef, VideosPlayerSlideProps> = ({nameKey, titleKey, date, dateTitle, youtubeIds, blockNameKey, slideIndex, totalSlides}, ref) => {
  const {t} = useTranslation(['data', 'common']);
  const mapRef = useRef<Map<string, YoutubeVideoRef> | null>(null);

  const getMapRef = () => {
    if (mapRef.current === null) {
      mapRef.current = new Map();
    }

    return mapRef.current;
  };

  const youtubeVideos = youtubeIds.map(({id, preview, vertical}) => {
    return (
      <YoutubeVideoComponent
        ref={newRef => {
          const map = getMapRef();
          if (newRef) {
            map.set(id, newRef);
          } else {
            map.delete(id);
          }
        }}
        sole={youtubeIds.length === 1}
        key={id}
        id={id}
        preview={preview}
        vertical={vertical}
      />
    );
  });

  useImperativeHandle(
    ref,
    () => ({
      destroy: () => {
        if (mapRef.current) {
          mapRef.current.forEach(i => i.destroy());
        }
      },
    }),
    []
  );

  return (
    <CarouselSlide key={nameKey} className={styles.container}>
      <div className={styles.titleContainer}>
        <Text c="main-grey" truncate className={styles.titleDate}>
          {date &&
            t('common:intlDate', {
              date: new Date(date.year, date.month),
              formatParams: {
                date: {month: 'long', year: 'numeric'},
              },
            })}
          {dateTitle && t(dateTitle)}
        </Text>
        <div className={styles.titleMain}>
          <Title lineClamp={1}>
            <q>{t(nameKey)}</q>
          </Title>
          <Text lineClamp={3}>{t(titleKey)}</Text>
        </div>
        <div className={styles.titleSub}>
          <Title order={4} lineClamp={1}>
            {t(blockNameKey)}
          </Title>
          <Text truncate>
            <b>{slideIndex + 1}</b>
            &nbsp; | &nbsp;
            {totalSlides}
          </Text>
        </div>
      </div>
      <div className={styles.videosContainer}>{youtubeVideos}</div>
    </CarouselSlide>
  );
};

export const VideosPlayerSlide = forwardRef<VideosPlayerSlidePropsRef, VideosPlayerSlideProps>(VideosPlayerSlideInternal);
