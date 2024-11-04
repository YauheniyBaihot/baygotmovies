import {useIntersection} from '@mantine/hooks';
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

  useImperativeHandle(
    ref,
    () => ({
      play: () => {
        if (elementRef.current && elementRef.current.paused) {
          void elementRef.current.play();
        }
      },
    }),
    []
  );

  useEffect(() => {
    if (entry?.isIntersecting && elementRef.current) {
      if (elementRef.current.paused) {
        elementRef.current
          .play()
          .catch(reason => {
            console.log('Error playing video');
            console.log(reason);
          })
          .finally(() => {
            if (!entry?.isIntersecting && elementRef.current) elementRef.current.pause();
          });
      }
    } else if (elementRef.current) {
      elementRef.current.pause();
    }
  }, [entry]);

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
  }, [intersectionRef, props]);
};

export const AutoPlayVideo = forwardRef<AutoPlayVideoPropsRef, AutoPlayVideoProps>(AutoPlayVideoInternal);
