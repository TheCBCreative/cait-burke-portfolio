import { PageContainer } from '../layout';
import { LoopingClip } from '../media';
import { BrowserFrame } from '../ui';
import type { ImageSlot } from '../../data/types';
import styles from './HeroImage.module.css';

interface HeroImageProps {
  image: ImageSlot;
  /** Shares a view transition name with the project's home row image, so one morphs into the other. */
  slug: string;
  /** The project's site, shown in the browser frame around a clip. */
  url: string;
}

/** A full-bleed screenshot, or a clip in a browser frame, under the case study hero. */
export function HeroImage({ image, slug, url }: HeroImageProps) {
  const media = (className: string) => (
    <LoopingClip
      media={image}
      loading="eager"
      fetchPriority="high"
      className={className}
      style={{ viewTransitionName: `project-${slug}` }}
    />
  );

  if (!image.video) {
    return <div className={styles.frame}>{media(styles.image)}</div>;
  }

  return (
    <div className={styles.stage}>
      <PageContainer inset>
        <BrowserFrame url={url}>{media(styles.clip)}</BrowserFrame>
      </PageContainer>
    </div>
  );
}
