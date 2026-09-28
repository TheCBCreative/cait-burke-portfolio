import { useRef } from 'react';
import { PageContainer } from '../layout';
import { LoopingClip } from '../media';
import { BrowserFrame } from '../ui';
import { useScrollLinked } from '../../hooks/useScrollLinked';
import type { ImageSlot } from '../../data/types';
import { cx } from '../../utils/cx';
import scrollLinked from '../../styles/scrollLinked.module.css';
import styles from './BreakImage.module.css';

interface BreakImageProps {
  image: ImageSlot;
  /** The project's site, shown in the browser frame around a clip. */
  url: string;
}

/** A full-bleed image, or a clip in a browser frame, between sections to change the page's rhythm. */
export function BreakImage({ image, url }: BreakImageProps) {
  const ref = useRef<HTMLElement>(null);
  const framed = Boolean(image.video);
  // Drifting would open gaps at the frame's edges, so framed clips only settle.
  useScrollLinked(ref, framed ? 'settle' : 'drift');

  if (!framed) {
    return (
      <figure className={styles.frame}>
        <LoopingClip media={image} mediaRef={ref} className={cx(styles.image, scrollLinked.drift)} />
      </figure>
    );
  }

  return (
    <figure className={styles.stage}>
      <PageContainer inset>
        <BrowserFrame url={url}>
          <LoopingClip media={image} mediaRef={ref} className={cx(styles.clip, scrollLinked.settle)} />
        </BrowserFrame>
      </PageContainer>
    </figure>
  );
}
