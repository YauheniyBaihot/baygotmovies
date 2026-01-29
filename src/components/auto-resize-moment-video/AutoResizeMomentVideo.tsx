import clsx from 'clsx';
import {FC, useEffect, useRef, useState} from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [src, setSrc] = useState<string | undefined>(undefined);

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

            // Get height and set src
            const height = container.getBoundingClientRect().height;
            const multiplier = isIOS ? 1 : window.devicePixelRatio;
            setSrc(calculateSrc(source, format, height * multiplier));
          }
        } else {
          activeVideos.delete(source);
          setSrc(undefined);
          // Properly cleanup video to prevent memory leak (WebKit bug #216820)
          const video = videoRef.current;
          if (video) {
            video.pause();
            video.src = '';
            video.load();
          }
        }
      },
      {rootMargin: '50px', threshold: 0}
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      activeVideos.delete(source);
      // Cleanup on unmount (WebKit bug #216820)
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, [source, format]);

  // Play video when src is set
  useEffect(() => {
    const video = videoRef.current;
    if (video && src) {
      video.play().catch(() => {});
    }
  }, [src]);

  return (
    <div ref={containerRef} className={clsx(styles.container, className)} data-index={index} data-format={format}>
      {src ? (
        <video ref={videoRef} className={styles.video} src={src} playsInline muted loop preload="metadata" />
      ) : (
        <div className={styles.placeholder} />
      )}
    </div>
  );
};
