import {useElementSize} from '@mantine/hooks';
import clsx from 'clsx';
import {FC, useCallback, useEffect, useRef, useState} from 'react';

import styles from './AutoResizeMomentVideo.module.css';

const availableHeights = [2160, 1080, 540, 270, 135];

const videosSrcPrefix = process.env.NEXT_PUBLIC_VIDEOS_SRC_PREFIX ?? '';

// Detect iOS/mobile
const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

// Track active videos globally to limit memory usage
const activeVideos = new Set<string>();
const MAX_ACTIVE_VIDEOS = isIOS ? 4 : 10;

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
  const {ref: sizeRef, height: containerHeight} = useElementSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [src, setSrc] = useState<string | undefined>(undefined);

  // Calculate src when visible and container has size
  useEffect(() => {
    if (!isVisible || containerHeight === 0) {
      setSrc(undefined);
      return;
    }

    const multiplier = isIOS ? 1 : window.devicePixelRatio;
    const actualContainerHeight = containerHeight * multiplier;

    setSrc(calculateSrc(source, format, actualContainerHeight));
  }, [containerHeight, source, format, isVisible]);

  // Play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible && src) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, src]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Check if we can activate more videos
          if (activeVideos.size < MAX_ACTIVE_VIDEOS) {
            activeVideos.add(source);
            setIsVisible(true);
          }
        } else {
          activeVideos.delete(source);
          setIsVisible(false);
        }
      },
      {rootMargin: '50px', threshold: 0}
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      activeVideos.delete(source);
    };
  }, [source]);

  // Combine refs
  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      sizeRef(el);
    },
    [sizeRef]
  );

  return (
    <div ref={setRefs} className={clsx(styles.container, className)} data-index={index} data-format={format}>
      {src ? (
        <video ref={videoRef} className={styles.video} src={src} playsInline muted loop preload="metadata" />
      ) : (
        <div className={styles.placeholder} />
      )}
    </div>
  );
};
