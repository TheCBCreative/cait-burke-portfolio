import { Eyebrow, Button } from '../ui';
import { PageContainer } from '../layout';
import type { CaseStudyCallout as CaseStudyCalloutContent } from '../../data/types';
import styles from './CaseStudyCallout.module.css';

interface CaseStudyCalloutProps {
  content: CaseStudyCalloutContent;
}

/** The "Live Demo" / "Live Site" banner just under the hero, pointing to
 * the real, working thing this case study describes. */
export function CaseStudyCallout({ content }: CaseStudyCalloutProps) {
  return (
    <section className={styles.callout} aria-label={content.eyebrow}>
      <PageContainer className={styles.inner}>
        <div className={styles.copy}>
          <Eyebrow tone="accent">{content.eyebrow}</Eyebrow>
          <h2 className={styles.heading}>{content.heading}</h2>
          <p className={styles.body}>{content.body}</p>
        </div>
        <div className={styles.action}>
          <Button href={content.buttonHref} variant="solid">
            {content.buttonLabel}
          </Button>
          {content.note && (
            <a
              href={content.noteHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.note}
            >
              {content.note}
            </a>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
