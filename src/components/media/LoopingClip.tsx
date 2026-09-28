import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { ImageSlot } from '../../data/types';
import styles from './LoopingClip.module.css';

interface LoopingClipProps {
  /** `src` is the poster and the reduced-motion still; `video` is the loop. */
  media: ImageSlot;
  /** Applied to the image or video, so callers size it like an image. */
  className?: string;
  style?: CSSProperties;
  mediaRef?: RefObject<HTMLElement | null>;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/** A muted screen recording that plays while on screen, with a pause button. Shows the still for reduced motion. */
export function LoopingClip({ media, className, style, mediaRef, loading = 'lazy', fetchPriority }: LoopingClipProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const showVideo = Boolean(media.video) && !prefersReducedMotion && !failed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || paused) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [paused, showVideo]);

  if (!showVideo) {
    return (
      <img
        ref={mediaRef as RefObject<HTMLImageElement | null>}
        src={media.src}
        alt={media.alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
        style={{ objectPosition: media.position, ...style }}
      />
    );
  }

  return (
    <div className={styles.clip}>
      <video
        ref={(node) => {
          videoRef.current = node;
          if (mediaRef) mediaRef.current = node;
        }}
        className={className}
        style={{ objectPosition: media.position, ...style }}
        poster={media.src}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onError={() => setFailed(true)}
      >
        <source src={media.video} type="video/mp4" />
      </video>
      <span className="visually-hidden">{media.alt}</span>
      <button type="button" className={styles.toggle} onClick={() => setPaused((isPaused) => !isPaused)}>
        <svg viewBox="0 0 10 10" width="10" height="10" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M2 1l7 4-7 4z" /> : <path d="M2 1h2v8H2zM6 1h2v8H6z" />}
        </svg>
        {paused ? 'Play' : 'Pause'}
        <span className="visually-hidden"> clip</span>
      </button>
    </div>
  );
}
