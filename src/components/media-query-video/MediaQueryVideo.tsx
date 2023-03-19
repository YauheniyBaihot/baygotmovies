import { useEffect, useState, createRef } from 'react';
import styles from '../header/Header.module.scss';

type MediaQueryVideoProps = {
  sources: {
    query: string;
    path: string;
  }[];
  className?: string;
};

export function MediaQueryVideo(props: MediaQueryVideoProps) {
  const { sources, className } = props;
  const videoRef = createRef<HTMLVideoElement>();
  const handleResize = () => {
    if (typeof window === 'undefined') return;

    const source = sources.find(x => window.matchMedia(x.query).matches);
    changeSrc(source?.path);
  };

  const [src, changeSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    handleResize();

    if (typeof window === 'undefined') return;

    const matchMediaArray = sources.map(x => window.matchMedia(x.query));
    matchMediaArray.forEach(x => x.addEventListener('change', handleResize));

    return () => {
      matchMediaArray.forEach(x =>
        x.removeEventListener('change', handleResize),
      );
    };
  }, [sources]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      autoPlay
      loop
      muted
      preload="auto"
    />
  );
}
