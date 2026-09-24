import { useState } from 'react';
import type { ImageSlot } from '../../data/types';
import { Lightbox } from './Lightbox';
import styles from './ImagePlaceholder.module.css';

interface ImagePlaceholderProps {
  image: ImageSlot;
  /** CSS aspect-ratio value, e.g. "16 / 10". Keeps layout stable whether
   * a placeholder or a real image is rendered. */
  aspectRatio: string;
  className?: string;
  /** Lets people click the image open a larger version in a lightbox.
   * Only takes effect once a real `image.src` is set — a placeholder has
   * nothing bigger to show. Leave unset where the image is already a
   * click target for something else (e.g. a Selected Work card link),
   * so clicks aren't ambiguous between "enlarge" and "navigate". */
  enlargeable?: boolean;
}

/**
 * Renders the real image once `image.src` is set; until then, renders a
 * placeholder box with the same footprint. The accessible name (`alt`) is
 * identical in both cases, so swapping in real assets later changes
 * nothing for screen-reader users — it's a purely visual upgrade.
 */
export function ImagePlaceholder({
  image,
  aspectRatio,
  className,
  enlargeable = false,
}: ImagePlaceholderProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const classes = [styles.frame, className].filter(Boolean).join(' ');

  if (image.src) {
    const img = (
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className={classes}
        style={{ aspectRatio }}
      />
    );

    if (!enlargeable) return img;

    return (
      <>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsEnlarged(true)}
          aria-label={`View larger — ${image.alt}`}
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

  return (
    <div className={classes} style={{ aspectRatio }} role="img" aria-label={image.alt}>
      <span className={styles.label}>{image.alt}</span>
    </div>
  );
}
