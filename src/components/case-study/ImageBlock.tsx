import { PageContainer } from '../layout';
import type { ImageSlot } from '../../data/types';
import { CaseStudyFigure } from './CaseStudyFigure';
import styles from './ImageBlock.module.css';

export function ImageBlock({ image }: { image: ImageSlot }) {
  return (
    <section className={styles.section}>
      <PageContainer className={styles.inner}>
        <CaseStudyFigure image={image} />
      </PageContainer>
    </section>
  );
}
