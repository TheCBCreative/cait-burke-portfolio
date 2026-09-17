import { SectionHeading } from '../ui';
import { PageContainer } from '../layout';
import type { CaseStudySection as CaseStudySectionContent } from '../../data/types';
import styles from './CaseStudySection.module.css';

interface CaseStudySectionProps {
  content: CaseStudySectionContent;
  /** Alternates the background so the context/approach/outcome beats read
   * as distinct steps while scrolling. */
  background: 'paper' | 'surface';
}

export function CaseStudySection({ content, background }: CaseStudySectionProps) {
  return (
    <section className={[styles.section, styles[background]].join(' ')}>
      <PageContainer className={styles.inner}>
        <SectionHeading eyebrow={content.eyebrow} heading={content.heading} />
        <p className={styles.body}>{content.body}</p>
      </PageContainer>
    </section>
  );
}
