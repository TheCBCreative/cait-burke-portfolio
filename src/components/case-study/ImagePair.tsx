import { PageContainer } from '../layout';
import type { ImageSlot } from '../../data/types';
import { CaseStudyFigure } from './CaseStudyFigure';
import styles from './ImagePair.module.css';

export function ImagePair({ images }: { images: [ImageSlot, ImageSlot] }) {
  return (
    <section className={styles.section}>
      <PageContainer className={styles.grid}>
        {images.map((image, index) => (
          <CaseStudyFigure key={image.src ?? image.alt} image={image} revealDelay={index * 200} />
        ))}
      </PageContainer>
    </section>
  );
}
