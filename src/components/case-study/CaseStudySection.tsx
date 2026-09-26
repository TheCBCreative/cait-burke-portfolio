import type { ReactNode } from 'react';
import { Reveal, SectionHeading } from '../ui';
import { PageContainer } from '../layout';
import type { Heading } from '../../data/types';
import { cx } from '../../utils/cx';
import surfaces from '../../styles/surfaces.module.css';
import styles from './CaseStudySection.module.css';

interface CaseStudySectionProps {
  id: string;
  /** "01 — The context" */
  eyebrow: string;
  heading: Heading;
  intro?: string;
  surface?: 'surface' | 'paper' | 'ink';
  headingSize?: 'h2-sm' | 'h2';
  /** Under the intro, in the same column. */
  leadFooter?: ReactNode;
  /** Sits beside the heading and intro on wide screens. */
  aside?: ReactNode;
  children?: ReactNode;
}

export function CaseStudySection({
  id,
  eyebrow,
  heading,
  intro,
  surface = 'surface',
  headingSize = 'h2',
  leadFooter,
  aside,
  children,
}: CaseStudySectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} className={cx(styles.section, surfaces[surface])} aria-labelledby={headingId}>
      <PageContainer inset className={styles.inner}>
        <div className={cx(styles.top, aside !== undefined && styles.split)}>
          <div className={styles.lead}>
            <SectionHeading
              eyebrow={eyebrow}
              heading={heading}
              headingId={headingId}
              tone={surface === 'ink' ? 'on-dark' : 'default'}
              size={headingSize}
            />
            {intro && (
              <Reveal variant="fade" delay={150}>
                <p className={styles.intro}>{intro}</p>
              </Reveal>
            )}
            {leadFooter}
          </div>
          {aside}
        </div>
        {children}
      </PageContainer>
    </section>
  );
}
