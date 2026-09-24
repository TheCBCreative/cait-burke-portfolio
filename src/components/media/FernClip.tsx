import { useState, type Ref } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const SOURCES = {
  desktop: { video: '/media/fern/desktop.mp4', poster: '/media/fern/desktop.jpg' },
  mobile: { video: '/media/fern/mobile.mp4', poster: '/media/fern/mobile.jpg' },
};

interface FernClipProps {
  /** 'mobile' is the portrait crop, 'desktop' the landscape one. */
  variant?: 'desktop' | 'mobile';
  className?: string;
  ref?: Ref<HTMLElement>;
}

/** The decorative looping fern footage. Shows the still instead for reduced motion or if the video fails. */
export function FernClip({ variant = 'desktop', className, ref }: FernClipProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [videoFailed, setVideoFailed] = useState(false);
  const source = SOURCES[variant];

  if (prefersReducedMotion || videoFailed) {
    return <img ref={ref as Ref<HTMLImageElement>} className={className} src={source.poster} alt="" />;
  }

  return (
    <video
      ref={ref as Ref<HTMLVideoElement>}
      className={className}
      poster={source.poster}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      onError={() => setVideoFailed(true)}
    >
      <source src={source.video} type="video/mp4" />
    </video>
  );
}
