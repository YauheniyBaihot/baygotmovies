import {useDebouncedCallback, useIntersection, useMergedRef} from '@mantine/hooks';
import {DetailedHTMLProps, FC, VideoHTMLAttributes, useEffect, useMemo, useRef} from 'react';

type AutoPlayVideoProps = DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & {
  threshold?: number;
};

export const AutoPlayVideo: FC<AutoPlayVideoProps> = props => {
  const threshold = props.threshold ?? 0.3;
  const {ref: intersectionRef, entry} = useIntersection<HTMLVideoElement>({threshold});
  const elementRef = useRef<HTMLVideoElement | null>(null);
  const ref = useMergedRef(elementRef, intersectionRef);

  const togglePlay = useDebouncedCallback(async (play: boolean) => {
    if (play) {
      await elementRef.current?.play();
    } else {
      elementRef.current?.pause();
    }
  }, 100);

  useEffect(() => {
    if (entry?.isIntersecting) {
      togglePlay(true);
    } else {
      togglePlay(false);
    }
  }, [entry, togglePlay]);

  return useMemo(() => {
    return <video ref={ref} {...props}></video>;
  }, [ref, props]);
};
