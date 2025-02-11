import {useElementSize} from '@mantine/hooks';
import clsx from 'clsx';
import {FC, useEffect, useMemo, useState} from 'react';

import styles from './AutoResizeMomentVideo.module.css';

const availableHeights = [2160, 1080, 540, 270, 135];

const videosSrcPrefix = process.env.NEXT_PUBLIC_VIDEOS_SRC_PREFIX ?? '';

const closestHeight = (height: number) => {
  let index = 1;

  while (availableHeights[index] >= height && index < availableHeights.length - 1) index++;

  return availableHeights[index - 1];
};

const calculateSrc = (source: string, format: 'wide' | 'square' | 'vertical', height: number) => {
  if (height === 0) return undefined;

  const videoPart = format === 'wide' ? '16-9' : format === 'square' ? '1-1' : '2-3';

  return `${videosSrcPrefix}${source}_${videoPart}_${closestHeight(height)}.webm`;
};
export const AutoResizeMomentVideo: FC<{
  className: string;
  source: string;
  format: 'wide' | 'square' | 'vertical';
  index: number;
}> = ({className, source, index, format}) => {
  const {ref, height: containerHeight} = useElementSize();

  const [src, setSrc] = useState(calculateSrc(source, format, containerHeight));

  useEffect(() => {
    console.log('auto resize moment use effect');

    const actualContainerHeight = containerHeight * window.devicePixelRatio;

    setSrc(calculateSrc(source, format, actualContainerHeight));
  }, [containerHeight, source, format]);

  return useMemo(() => {
    console.log('auto resize moment use memo');

    return (
      <div ref={ref} className={clsx(styles.container, className)} data-index={index} data-format={format}>
        <video className={styles.video} src={src} playsInline autoPlay muted loop preload="auto" />
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [className, index, format, src]);
};
