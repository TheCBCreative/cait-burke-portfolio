import { ImageFrame, Reveal } from '../ui';
import type { ImageSlot } from '../../data/types';
import styles from './CaseStudyFigure.module.css';

interface CaseStudyFigureProps {
  image: ImageSlot;
  revealDelay?: number;
}

/** An enlargeable screenshot with its caption. */
export function CaseStudyFigure({ image, revealDelay }: CaseStudyFigureProps) {
  return (
    <figure className={styles.figure}>
      <Reveal variant="wipe" delay={revealDelay}>
        <ImageFrame image={image} aspectRatio="16 / 9" enlargeable />
      </Reveal>
      {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
    </figure>
  );
}
