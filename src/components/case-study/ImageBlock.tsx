import { ImagePlaceholder } from '../ui';
import { PageContainer } from '../layout';
import type { ImageSlot } from '../../data/types';
import styles from './ImageBlock.module.css';

interface ImageBlockProps {
  image: ImageSlot;
}

/** One full-width screenshot with a figure caption underneath. */
export function ImageBlock({ image }: ImageBlockProps) {
  return (
    <section className={styles.section}>
      <PageContainer>
        <figure className={styles.figure}>
          <ImagePlaceholder image={image} aspectRatio="16 / 9" enlargeable />
          {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
        </figure>
      </PageContainer>
    </section>
  );
}
