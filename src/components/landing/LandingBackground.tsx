import { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './LandingBackground.module.css';

const DESKTOP_QUERY = '(min-width: 700px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const SOURCES = {
  desktop: { video: '/media/landing/fern-desktop.mp4', poster: '/media/landing/fern-desktop.jpg' },
  mobile: { video: '/media/landing/fern-mobile.mp4', poster: '/media/landing/fern-mobile.jpg' },
};

/**
 * The Landing page's full-bleed background: a looping, muted fern video
 * with a matching still as its poster. The still also becomes the whole
 * background for anyone who prefers reduced motion, or if the video fails
 * to load for any reason — so there's always something to look at, not a
 * blank frame while (or if) the video comes in.
 */
export function LandingBackground() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const [videoFailed, setVideoFailed] = useState(false);

  const source = isDesktop ? SOURCES.desktop : SOURCES.mobile;
  const showVideo = !prefersReducedMotion && !videoFailed;

  return (
    <div className={styles.background} aria-hidden="true">
      {showVideo ? (
        <video
          // Remounts on breakpoint change so the new source loads cleanly
          // instead of hot-swapping `src` on a live element.
          key={source.video}
          className={styles.media}
          poster={source.poster}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
        >
          <source src={source.video} type="video/mp4" />
        </video>
      ) : (
        <img className={styles.media} src={source.poster} alt="" />
      )}
    </div>
  );
}
