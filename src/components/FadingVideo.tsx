import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FadingVideoProps {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
}

const FadingVideo = ({ src, poster, className, videoClassName }: FadingVideoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

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
        src={src}
        poster={poster}
        className={cn(
          'relative h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none',
          isLoaded ? 'opacity-100' : 'opacity-0',
          videoClassName
        )}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedData={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default FadingVideo;
