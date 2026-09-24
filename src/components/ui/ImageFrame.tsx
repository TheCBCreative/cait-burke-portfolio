import { useState } from 'react';
import type { ImageSlot } from '../../data/types';
import { cx } from '../../utils/cx';
import { Lightbox } from './Lightbox';
import hoverZoom from '../../styles/hoverZoom.module.css';
import styles from './ImageFrame.module.css';

interface ImageFrameProps {
  image: ImageSlot;
  /** CSS aspect-ratio, e.g. "16 / 9". Reserves the space before the image loads. */
  aspectRatio: string;
  className?: string;
  /** Click to open in a lightbox. Leave off where the image is already inside a link. */
  enlargeable?: boolean;
}

/** An image, or a same-sized placeholder until `image.src` is set. */
export function ImageFrame({ image, aspectRatio, className, enlargeable = false }: ImageFrameProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const classes = cx(styles.frame, className);

  if (!image.src) {
    return (
      <div className={cx(classes, styles.placeholder)} style={{ aspectRatio }} role="img" aria-label={image.alt}>
        <span className={styles.placeholderLabel}>{image.alt}</span>
      </div>
    );
  }

  const img = (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      decoding="async"
      className={cx(classes, enlargeable && hoverZoom.target)}
      style={{ aspectRatio }}
    />
  );

  if (!enlargeable) return img;

  return (
    <>
      <button
        type="button"
        className={cx(styles.trigger, hoverZoom.trigger)}
        onClick={() => setIsEnlarged(true)}
        aria-label={`View larger: ${image.alt}`}
      >
        {img}
        <span className={styles.zoomHint} aria-hidden="true">
          View larger
        </span>
      </button>
      {isEnlarged && <Lightbox image={image} onClose={() => setIsEnlarged(false)} />}
    </>
  );
}
