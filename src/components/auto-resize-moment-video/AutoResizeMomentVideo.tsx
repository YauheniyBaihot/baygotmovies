import {useElementSize} from '@mantine/hooks';
import clsx from 'clsx';
import {FC, useEffect, useState} from 'react';

import styles from './AutoResizeMomentVideo.module.css';

const availableHeights = [2160, 1080, 540, 270, 135];

const videosSrcPrefix = process.env.NEXT_PUBLIC_VIDEOS_SRC_PREFIX ?? '';

// Detect iOS
const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const closestHeight = (height: number) => {
  let index = 1;

  while (availableHeights[index] >= height && index < availableHeights.length - 1) index++;

  return availableHeights[index - 1];
};

const calculateSrc = (source: string, format: 'wide' | 'square' | 'vertical', height: number) => {
  if (height === 0) return undefined;

  const videoPart = format === 'wide' ? '16-9' : format === 'square' ? '1-1' : '2-3';

  // On iOS, use lower resolution to save memory
  const maxHeight = isIOS ? Math.min(height, 1080) : height;

  return `${videosSrcPrefix}${source}_${videoPart}_${closestHeight(maxHeight)}.webm`;
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
    // On iOS, don't multiply by devicePixelRatio to reduce memory
    const multiplier = isIOS ? 1 : window.devicePixelRatio;
    const actualContainerHeight = containerHeight * multiplier;

    setSrc(calculateSrc(source, format, actualContainerHeight));
  }, [containerHeight, source, format]);

  return (
    <div ref={ref} className={clsx(styles.container, className)} data-index={index} data-format={format}>
      <video className={styles.video} src={src} playsInline autoPlay muted loop preload="none" />
    </div>
  );
};
