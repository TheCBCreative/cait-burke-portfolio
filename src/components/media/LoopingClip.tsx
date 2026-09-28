import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { ImageSlot } from '../../data/types';
import styles from './LoopingClip.module.css';

interface LoopingClipProps {
  /** `src` is the poster and the reduced-motion still; `video` is the loop. */
  media: ImageSlot;
  /** 'view' plays while on screen; 'hover' waits for a hover or the Play button. */
  playOn?: 'view' | 'hover';
  /** Applied to the image or video, so callers size it like an image. */
  className?: string;
  style?: CSSProperties;
  mediaRef?: RefObject<HTMLElement | null>;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/** A muted screen recording with a Play/Pause button. Shows the still for reduced motion. */
export function LoopingClip({
  media,
  playOn = 'view',
  className,
  style,
  mediaRef,
  loading = 'lazy',
  fetchPriority,
}: LoopingClipProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);
  const [wanted, setWanted] = useState(playOn === 'view');
  const showVideo = Boolean(media.video) && !prefersReducedMotion && !failed;
  const playing = inView && wanted;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(video);
    return () => observer.disconnect();
  }, [showVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) void video.play().catch(() => {});
    else video.pause();
  }, [playing]);

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

  // Mouse only: a tap fires enter and leave around the click, which would fight the button.
  const hoverTo = (want: boolean) => (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setWanted(want);
  };
  const hover = playOn === 'hover' ? { onPointerEnter: hoverTo(true), onPointerLeave: hoverTo(false) } : {};

  return (
    <div className={styles.clip} {...hover}>
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
      <button type="button" className={styles.toggle} onClick={() => setWanted(!playing)}>
        <svg viewBox="0 0 10 10" width="10" height="10" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M2 1h2v8H2zM6 1h2v8H6z" /> : <path d="M2 1l7 4-7 4z" />}
        </svg>
        {playing ? 'Pause' : 'Play'}
        <span className="visually-hidden"> clip</span>
      </button>
    </div>
  );
}
