import type { ImageSlot } from '../../data/types';
import styles from './ImagePlaceholder.module.css';

interface ImagePlaceholderProps {
  image: ImageSlot;
  /** CSS aspect-ratio value, e.g. "16 / 10". Keeps layout stable whether
   * a placeholder or a real image is rendered. */
  aspectRatio: string;
  className?: string;
}

/**
 * Renders the real image once `image.src` is set; until then, renders a
 * placeholder box with the same footprint. The accessible name (`alt`) is
 * identical in both cases, so swapping in real assets later changes
 * nothing for screen-reader users — it's a purely visual upgrade.
 */
export function ImagePlaceholder({ image, aspectRatio, className }: ImagePlaceholderProps) {
  const classes = [styles.frame, className].filter(Boolean).join(' ');

  if (image.src) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className={classes}
        style={{ aspectRatio }}
      />
    );
  }

  return (
    <div className={classes} style={{ aspectRatio }} role="img" aria-label={image.alt}>
      <span className={styles.label}>{image.alt}</span>
    </div>
  );
}
