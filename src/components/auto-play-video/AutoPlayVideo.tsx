import {useDebouncedCallback, useIntersection} from '@mantine/hooks';
import {DetailedHTMLProps, ForwardRefRenderFunction, VideoHTMLAttributes, forwardRef, useEffect, useImperativeHandle, useMemo, useRef} from 'react';

type AutoPlayVideoProps = DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & {
  threshold?: number;
};

export type AutoPlayVideoPropsRef = {
  play: () => void;
};

const AutoPlayVideoInternal: ForwardRefRenderFunction<AutoPlayVideoPropsRef, AutoPlayVideoProps> = (props, ref) => {
  const threshold = props.threshold ?? 0.3;
  const {ref: intersectionRef, entry} = useIntersection({threshold});
  const elementRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = useDebouncedCallback(async (play: boolean) => {
    if (play) {
      await elementRef.current?.play();
    } else {
      elementRef.current?.pause();
    }
  }, 300);

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        togglePlay(true);
      },
    }),
    [togglePlay]
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      togglePlay(true);
    } else {
      togglePlay(false);
    }
  }, [entry, togglePlay]);

  return useMemo(() => {
    return (
      <video
        ref={element => {
          intersectionRef(element);
          elementRef.current = element;
        }}
        {...props}
      ></video>
    );
  }, [intersectionRef, JSON.stringify(props)]);
};
export const AutoPlayVideo = forwardRef<AutoPlayVideoPropsRef, AutoPlayVideoProps>(AutoPlayVideoInternal);
