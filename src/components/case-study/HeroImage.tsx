import { LoopingClip } from '../media';
import type { ImageSlot } from '../../data/types';
import styles from './HeroImage.module.css';

interface HeroImageProps {
  image: ImageSlot;
  /** Shares a view transition name with the project's home row image, so one morphs into the other. */
  slug: string;
}

/** Full-bleed screenshot or clip under the case study hero. */
export function HeroImage({ image, slug }: HeroImageProps) {
  return (
    <div className={styles.frame}>
      <LoopingClip
        media={image}
        loading="eager"
        fetchPriority="high"
        className={styles.image}
        style={{ viewTransitionName: `project-${slug}` }}
      />
    </div>
  );
}
