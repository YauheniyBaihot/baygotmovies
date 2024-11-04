import {ActionIcon} from '@mantine/core';
import {useElementSize} from '@mantine/hooks';
import Image from 'next/image';
import React, {ForwardRefRenderFunction, forwardRef, useEffect, useId, useImperativeHandle, useRef} from 'react';

import PlayIcon from '@/icons/play.svg';

import styles from './YoutubeVideo.module.css';

type YoutubeVideoProps = {id: string; preview: string; sole: boolean; vertical?: boolean};

export type YoutubeVideoRef = {
  destroy: () => void;
};

const YoutubeVideoInternal: ForwardRefRenderFunction<YoutubeVideoRef, YoutubeVideoProps> = ({id, preview, sole, vertical}, ref) => {
  const playerRef = useRef<YT.Player | null>(null);
  const containerId = useId();
  const {ref: contentBoxRef, width, height} = useElementSize();

  useEffect(() => {
    if (playerRef.current !== null && width > 0 && height > 0) {
      playerRef.current.setSize(width, height);
    }
  }, [width, height]);

  useImperativeHandle(
    ref,
    () => ({
      destroy: () => {
        if (playerRef.current) {
          playerRef.current?.destroy();
          playerRef.current = null;
        }
      },
    }),
    []
  );

  const onPlayerReady = () => {
    playerRef.current?.playVideo();
  };

  const handleClick = () => {
    playerRef.current = new YT.Player(containerId, {
      videoId: id,
      playerVars: {
        playsinline: 1,
      },
      width,
      height,
      events: {
        onReady: onPlayerReady,
      },
    });
  };

  const imageSizes = !sole ? '(min-width: 62em) 50vw,(max-width: 62em) 100vw' : undefined;

  return (
    <div className={styles.container} data-vertical={vertical}>
      <div className={styles.innerContainer}>
        <div ref={contentBoxRef} className={styles.contentBox}>
          <Image src={preview} fill alt="Film preview" sizes={imageSizes} className={styles.previewImage} />
          <ActionIcon className={styles.playButton} onClick={handleClick} variant="transparent" aria-label="Play" color="transparent-white" size="var(--app-play-button-size)">
            <PlayIcon />
          </ActionIcon>
          <div id={containerId}></div>
        </div>
      </div>
    </div>
  );
};

export const YoutubeVideo = forwardRef<YoutubeVideoRef, YoutubeVideoProps>(YoutubeVideoInternal);
