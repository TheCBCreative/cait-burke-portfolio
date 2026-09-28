import { useRef } from 'react';
import { LoopingClip } from '../media';
import { useScrollLinked } from '../../hooks/useScrollLinked';
import type { ImageSlot } from '../../data/types';
import { cx } from '../../utils/cx';
import scrollLinked from '../../styles/scrollLinked.module.css';
import styles from './BreakImage.module.css';

/** A full-bleed image or clip between sections that changes the page's rhythm. */
export function BreakImage({ image }: { image: ImageSlot }) {
  const ref = useRef<HTMLElement>(null);
  useScrollLinked(ref, 'drift');

  return (
    <figure className={styles.frame}>
      <LoopingClip media={image} mediaRef={ref} className={cx(styles.image, scrollLinked.drift)} />
    </figure>
  );
}
