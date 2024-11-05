import {Button, Title} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {useTranslation} from 'next-i18next';
import {FC, useMemo, useState} from 'react';

import {VideoBlock} from '@/components/video-block/VideoBlock';
import {VideosPlayer} from '@/components/videos-player/VideosPlayer';
import {SiteBlock} from '@/models/site-block';

import styles from './MainPageBlock.module.css';

type VideosBlockProps = {
  block: SiteBlock;
};

const MAX_MOMENTS_FOR_BLOCK = 8;

const BLOCK_CONFIG = [[1], [2], [3], [1, 2, 1], [2, 2, 1], [2, 3, 1], [2, 3, 2], [2, 3, 3]];

export const MainPageBlock: FC<VideosBlockProps> = ({block}) => {
  const {path, titleKey, subTitleKey, nameKey, works, moments, watchButtonKey} = block;
  const [playerOpened, {toggle: togglePlayer}] = useDisclosure(false);
  const {t} = useTranslation('data');
  const [buttonPosition, setButtonPosition] = useState<'left' | 'right'>('left');

  const momentsMemo = useMemo(() => {
    let acc = 0;
    const data = moments.slice(0, MAX_MOMENTS_FOR_BLOCK);

    return BLOCK_CONFIG[data.length - 1].map(val => {
      const portion = data.slice(acc, acc + val);
      acc += val;
      return portion;
    });
  }, [moments]);

  const blocks = useMemo(() => {
    return momentsMemo.map((w, index) => {
      const isTitleBlock = (momentsMemo.length === 1 || index === 1) && subTitleKey && titleKey;
      if (index === momentsMemo.length - 1) {
        let buttonPosition: 'right' | 'left' = 'right';

        if (w.length === 2) {
          buttonPosition = isTitleBlock ? 'right' : 'left';
        }

        if (w.length === 3) {
          buttonPosition = 'left';
        }

        setButtonPosition(buttonPosition);
      }

      return isTitleBlock ? <VideoBlock className={styles.videoBlock} key={index} moments={w} titleKey={titleKey} subTitleKey={subTitleKey} /> : <VideoBlock className={styles.videoBlock} key={index} moments={w} />;
    });
  }, [subTitleKey, titleKey, momentsMemo]);

  return (
    <>
      <div className={styles.container} id={path}>
        <Title className={styles.heading}>{t(nameKey)}</Title>
        {blocks}

        <div className={styles.moreVideosButton} data-position={buttonPosition}>
          <Button onClick={togglePlayer}>{t(watchButtonKey)}</Button>
        </div>
      </div>
      <VideosPlayer blockNameKey={nameKey} onClose={togglePlayer} opened={playerOpened} videos={works} />
    </>
  );
};
