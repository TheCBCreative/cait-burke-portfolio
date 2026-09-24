import { ImagePlaceholder } from '../ui';
import { PageContainer } from '../layout';
import type { ImageSlot } from '../../data/types';
import styles from './ImagePair.module.css';

interface ImagePairProps {
  images: [ImageSlot, ImageSlot];
}

/** Two supporting screenshots side by side on wide screens, stacked on
 * narrow ones. */
export function ImagePair({ images }: ImagePairProps) {
  return (
    <section className={styles.section}>
      <PageContainer className={styles.grid}>
        {images.map((image) => (
          <figure className={styles.figure} key={image.alt}>
            <ImagePlaceholder image={image} aspectRatio="16 / 9" enlargeable />
            {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
          </figure>
        ))}
      </PageContainer>
    </section>
  );
}
