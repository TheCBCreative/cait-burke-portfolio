import { Eyebrow, Button, Reveal } from '../ui';
import { PageContainer } from '../layout';
import type { CalloutContent } from '../../data/types';
import styles from './CaseStudyCallout.module.css';

/** The banner linking to the live demo or site. */
export function CaseStudyCallout({ content }: { content: CalloutContent }) {
  return (
    <section className={styles.callout} aria-label={content.eyebrow}>
      <PageContainer className={styles.inner}>
        <Reveal variant="fade" className={styles.copy}>
          <Eyebrow tone="on-dark">{content.eyebrow}</Eyebrow>
          <h2 className={styles.heading}>{content.heading}</h2>
          <p className={styles.body}>{content.body}</p>
        </Reveal>
        <Reveal variant="fade" delay={200} className={styles.action}>
          <Button href={content.buttonHref} variant="solid" tone="on-dark">
            {content.buttonLabel}
          </Button>
        </Reveal>
      </PageContainer>
    </section>
  );
}
