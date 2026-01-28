import {useElementSize, useIntersection} from '@mantine/hooks';
import clsx from 'clsx';
import {FC, useEffect, useRef, useState} from 'react';

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
  const {ref: sizeRef, height: containerHeight} = useElementSize();
  const {ref: intersectionRef, entry} = useIntersection<HTMLDivElement>({
    threshold: 0,
    rootMargin: '100px',
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const [src, setSrc] = useState<string | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  // Track visibility
  useEffect(() => {
    const visible = entry?.isIntersecting ?? false;
    setIsVisible(visible);

    if (!visible && videoRef.current) {
      videoRef.current.pause();
    }
  }, [entry?.isIntersecting]);

  // Calculate and set src only when visible
  useEffect(() => {
    if (!isVisible || containerHeight === 0) {
      return;
    }

    const actualContainerHeight = containerHeight * window.devicePixelRatio;
    const newSrc = calculateSrc(source, format, actualContainerHeight);

    setSrc(newSrc);
  }, [containerHeight, source, format, isVisible]);

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, src]);

  const setRefs = (el: HTMLDivElement | null) => {
    sizeRef(el);
    intersectionRef(el);
  };

  return (
    <div ref={setRefs} className={clsx(styles.container, className)} data-index={index} data-format={format}>
      {src && <video ref={videoRef} className={styles.video} src={src} playsInline muted loop preload="metadata" />}
    </div>
  );
};
