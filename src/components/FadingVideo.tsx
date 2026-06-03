import { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FadingVideoProps {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
}

const FADE_DURATION_MS = 520;

const FadingVideo = ({ src, poster, className, videoClassName }: FadingVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const fadeInVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Number(video.style.opacity) >= 1 || animationFrameRef.current) return;

    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / FADE_DURATION_MS, 1);
      video.style.opacity = progress.toString();

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(tick);
      } else {
        animationFrameRef.current = undefined;
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
  }, []);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {poster && (
        <img
          src={poster}
          alt=""
          className={cn('absolute inset-0 h-full w-full object-cover', videoClassName)}
          aria-hidden="true"
        />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={cn('relative h-full w-full object-cover', videoClassName)}
        style={{ opacity: 0 }}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedData={fadeInVideo}
        onCanPlay={fadeInVideo}
        onPlaying={fadeInVideo}
      />
    </div>
  );
};

export default FadingVideo;
