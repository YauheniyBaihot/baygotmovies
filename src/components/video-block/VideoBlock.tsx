import {Title} from '@mantine/core';
import clsx from 'clsx';
import {ParseKeys} from 'i18next';
import {useTranslation} from 'next-i18next';
import {FC, Fragment} from 'react';

import {AutoResizeMomentVideo} from '@/components/auto-resize-moment-video/AutoResizeMomentVideo';
import {VideoTitle} from '@/components/video-title/VideoTitle';
import {Moment} from '@/models/site-block';

import styles from './VideoBlock.module.css';

type VideoFormat = 'wide' | 'square' | 'vertical';

type BlockVariant = '1' | '2' | '3' | '1t' | '2t' | '3t';

type Config = Record<BlockVariant, VideoFormat[]>;

const config: Config = {
  '1t': ['wide'],
  '1': ['wide'],
  '2': ['square', 'square'],
  '2t': ['wide', 'square'],
  '3': ['square', 'square', 'vertical'],
  '3t': ['wide', 'vertical', 'wide'],
};

export const VideoBlock: FC<{
  moments: Moment[];
  titleKey?: ParseKeys<'data'>;
  subTitleKey?: ParseKeys<'data'>;
  className?: string;
}> = ({moments, titleKey, subTitleKey, className}) => {
  const {t} = useTranslation('data');

  if (moments.length === 1) {
    titleKey = undefined;
    subTitleKey = undefined;
  }

  const hasTitle = titleKey !== undefined && subTitleKey !== undefined;

  if (moments.length !== 1 && moments.length !== 2 && moments.length !== 3) throw new Error();

  const blockVariant: keyof typeof config = `${moments.length}${hasTitle ? 't' : ''}`;

  const items = moments.map(({nameKey, source, date, title}, index) => (
    <Fragment key={source}>
      <AutoResizeMomentVideo className={styles.videoContainer} source={source} index={index} format={config[blockVariant][index]} />
      <VideoTitle nameKey={nameKey} date={date} dateTitle={title} className={styles.videoContainerTitle} index={index} />
    </Fragment>
  ));

  return (
    <div className={clsx(className, styles.block)} data-variant={blockVariant}>
      <div className={styles.border} />
      {items}
      {titleKey && subTitleKey && (
        <div className={styles.titleContainer}>
          <div className={styles.titleInnerContainer}>
            <Title>
              <q>{t(titleKey)}</q>
            </Title>
            <Title order={4}>{t(subTitleKey)}</Title>
          </div>
        </div>
      )}
    </div>
  );
};
