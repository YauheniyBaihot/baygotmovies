import {useElementSize, useIntersection, useMergedRef} from '@mantine/hooks';
import clsx from 'clsx';
import {FC, useEffect, useMemo, useRef, useState} from 'react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const {ref: elementSizeRef, height: containerHeight} = useElementSize();

  // Load and play when at least 5% of the video is visible
  const {ref: intersectionRef, entry} = useIntersection<HTMLDivElement>({
    threshold: 0.05,
  });

  const mergedRef = useMergedRef(elementSizeRef, intersectionRef);

  const [src, setSrc] = useState(calculateSrc(source, format, containerHeight));

  useEffect(() => {
    const actualContainerHeight = containerHeight * window.devicePixelRatio;

    setSrc(calculateSrc(source, format, actualContainerHeight));
  }, [containerHeight, source, format]);

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
    if (videoRef.current && !videoSrc) {
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, [videoSrc]);

  return useMemo(() => {
    return (
      <div ref={mergedRef} className={clsx(styles.container, className)} data-index={index} data-format={format}>
        <video ref={videoRef} className={styles.video} src={videoSrc} playsInline muted loop preload="auto" />
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [className, index, format, videoSrc]);
};
