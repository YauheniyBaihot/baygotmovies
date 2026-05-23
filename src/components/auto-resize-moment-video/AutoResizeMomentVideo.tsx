import {useElementSize, useHover, useIntersection, useMergedRef} from '@mantine/hooks';
import clsx from 'clsx';
import {FC, useEffect, useMemo, useRef, useState} from 'react';

import {useVideosPlay} from '@/components/video-coordinator/VideosPlayContext';

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
  const {hovered, ref: hoverRef} = useHover();
  const {ref: intersectionRef, entry} = useIntersection<HTMLDivElement>({
    threshold: 0.75,
  });
  const mergedRef = useMergedRef(elementSizeRef, hoverRef, intersectionRef);

  const {activeVideoId, isSingleIntersecting, registerVideo, unregisterVideo, updateStatus, onVideoEnded} = useVideosPlay();

  const [src, setSrc] = useState(calculateSrc(source, format, containerHeight));

  const videoId = source;

  useEffect(() => {
    registerVideo(videoId);
    return () => {
      unregisterVideo(videoId);
    };
  }, [videoId, registerVideo, unregisterVideo]);

  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    updateStatus(videoId, isIntersecting, hovered);
  }, [videoId, isIntersecting, hovered, updateStatus]);

  const isActive = activeVideoId === videoId;

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(err => {
          console.warn('Playback prevented for video:', videoId, err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, videoId]);

  useEffect(() => {
    const actualContainerHeight = containerHeight * window.devicePixelRatio;

    setSrc(calculateSrc(source, format, actualContainerHeight));
  }, [containerHeight, source, format]);

  const handleEnded = () => {
    if (isSingleIntersecting) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => console.warn(err));
      }
    } else {
      onVideoEnded(videoId);
    }
  };

  const shouldLoop = hovered || (isActive && isSingleIntersecting);

  return useMemo(() => {
    return (
      <div ref={mergedRef} className={clsx(styles.container, className)} data-index={index} data-format={format}>
        <video ref={videoRef} className={styles.video} src={src} playsInline muted loop={shouldLoop} preload="auto" onEnded={handleEnded} />
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [className, index, format, src, shouldLoop]);
};
