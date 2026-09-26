import type { ImageSlot } from '../../data/types';
import styles from './BreakImage.module.css';

/** A full-bleed image between sections that changes the page's rhythm. */
export function BreakImage({ image }: { image: ImageSlot }) {
  return (
    <figure className={styles.frame}>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className={styles.image}
        style={{ objectPosition: image.position }}
      />
    </figure>
  );
}
