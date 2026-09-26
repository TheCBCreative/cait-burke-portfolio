import { useRef } from 'react';
import { useScrollLinked } from '../../hooks/useScrollLinked';
import type { ImageSlot } from '../../data/types';
import { cx } from '../../utils/cx';
import scrollLinked from '../../styles/scrollLinked.module.css';
import styles from './BreakImage.module.css';

/** A full-bleed image between sections that changes the page's rhythm. */
export function BreakImage({ image }: { image: ImageSlot }) {
  const ref = useRef<HTMLImageElement>(null);
  useScrollLinked(ref, 'drift');

  return (
    <figure className={styles.frame}>
      <img
        ref={ref}
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className={cx(styles.image, scrollLinked.drift)}
        style={{ objectPosition: image.position }}
      />
    </figure>
  );
}
