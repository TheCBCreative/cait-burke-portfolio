import type { ImageSlot } from '../../data/types';
import { entrance, entranceStep } from '../ui';
import { cx } from '../../utils/cx';
import styles from './HeroImage.module.css';

interface HeroImageProps {
  image: ImageSlot;
  /** Shares a view transition name with the project's home row image. */
  slug: string;
}

/** Full-bleed screenshot under the case study hero. */
export function HeroImage({ image, slug }: HeroImageProps) {
  return (
    <div className={styles.frame}>
      <img
        src={image.src}
        alt={image.alt}
        decoding="async"
        fetchPriority="high"
        className={cx(styles.image, entrance.enter)}
        style={{ ...entranceStep(5), objectPosition: image.position, viewTransitionName: `project-${slug}` }}
      />
    </div>
  );
}
