import { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const SOURCES = {
  desktop: { video: '/media/landing/fern-desktop.mp4', poster: '/media/landing/fern-desktop.jpg' },
  mobile: { video: '/media/landing/fern-mobile.mp4', poster: '/media/landing/fern-mobile.jpg' },
};

interface FernClipProps {
  /** Which source pair to use — 'mobile' is a portrait crop, 'desktop' a
   * landscape one. Pick based on the slot's own shape, not necessarily
   * the viewport (a narrow desktop slot can still want the portrait clip). */
  variant?: 'desktop' | 'mobile';
  className?: string;
  /** Omit for a purely decorative clip (aria-hidden, empty alt). Pass a
   * real string when this clip is the section's only image content. */
  alt?: string;
}

/**
 * A looping, muted clip of the fern footage used as a recurring texture
 * across the site (Landing background, hero edge tabs, the About photo
 * slot). Falls back to a matching still for anyone who prefers reduced
 * motion, or if the video fails to load — so there's always something to
 * look at rather than a blank box.
 */
export function FernClip({ variant = 'desktop', className, alt = '' }: FernClipProps) {
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const [videoFailed, setVideoFailed] = useState(false);
  const source = SOURCES[variant];
  const showVideo = !prefersReducedMotion && !videoFailed;

  if (!showVideo) {
    return <img className={className} src={source.poster} alt={alt} />;
  }

  return (
    <video
      className={className}
      poster={source.poster}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden={alt === '' ? 'true' : undefined}
      aria-label={alt || undefined}
      role={alt ? 'img' : undefined}
      onError={() => setVideoFailed(true)}
    >
      <source src={source.video} type="video/mp4" />
    </video>
  );
}
