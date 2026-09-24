import { SectionHeading, Reveal } from '../ui';
import { PageContainer } from '../layout';
import type { SectionContent } from '../../data/types';
import { cx } from '../../utils/cx';
import styles from './CaseStudySection.module.css';

interface CaseStudySectionProps {
  content: SectionContent;
  background: 'paper' | 'surface';
}

export function CaseStudySection({ content, background }: CaseStudySectionProps) {
  return (
    <section className={cx(styles.section, styles[background])}>
      <PageContainer className={styles.inner}>
        <SectionHeading eyebrow={content.eyebrow} heading={content.heading} />
        <Reveal variant="fade" delay={200}>
          <p className={styles.body}>{content.body}</p>
        </Reveal>
      </PageContainer>
    </section>
  );
}
