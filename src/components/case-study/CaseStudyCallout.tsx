import { Button, Eyebrow, Reveal } from '../ui';
import { PageContainer } from '../layout';
import { FernBackground } from '../media';
import type { CalloutContent } from '../../data/types';
import { cx } from '../../utils/cx';
import surfaces from '../../styles/surfaces.module.css';
import styles from './CaseStudyCallout.module.css';

/** Full-bleed band over the fern footage, linking to the live demo or site. */
export function CaseStudyCallout({ content }: { content: CalloutContent }) {
  return (
    <section className={cx(styles.callout, surfaces.ink)} aria-labelledby="callout-heading">
      <FernBackground />
      <div className={styles.scrim} aria-hidden="true" />
      <PageContainer inset className={styles.inner}>
        <Reveal variant="fade" className={styles.copy}>
          <Eyebrow tone="accent-on-dark">{content.eyebrow}</Eyebrow>
          <h2 id="callout-heading" className={styles.heading}>
            {content.heading}
          </h2>
          <p className={styles.body}>{content.body}</p>
        </Reveal>
        <Reveal variant="fade" delay={200} className={styles.action}>
          <Button href={content.buttonHref} variant="solid" tone="on-dark" arrow="right">
            {content.buttonLabel}
          </Button>
        </Reveal>
      </PageContainer>
    </section>
  );
}
