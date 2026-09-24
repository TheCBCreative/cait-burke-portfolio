import { Link } from 'react-router-dom';
import { Eyebrow } from '../ui';
import { PageContainer } from '../layout';
import { CASE_STUDIES, PROJECT_SUMMARIES } from '../../data/projects';
import styles from './CaseStudyFooterNav.module.css';

interface CaseStudyFooterNavProps {
  currentSlug: string;
  nextProjectSlug: string;
}

/** Closes out a case study by pointing to the next project — or, once
 * you've reached the last project in the "Selected Work" order, back to
 * the full grid instead of cycling around to the first one again. */
export function CaseStudyFooterNav({ currentSlug, nextProjectSlug }: CaseStudyFooterNavProps) {
  const isLastProject =
    PROJECT_SUMMARIES.findIndex((project) => project.slug === currentSlug) ===
    PROJECT_SUMMARIES.length - 1;

  if (isLastProject) {
    return (
      <footer className={styles.footer}>
        <PageContainer className={styles.inner}>
          <Eyebrow tone="on-dark">More work</Eyebrow>
          <Link to="/home#selected-work" className={styles.nextLink}>
            View all work →
          </Link>
        </PageContainer>
      </footer>
    );
  }

  const nextProject = CASE_STUDIES[nextProjectSlug];

  return (
    <footer className={styles.footer}>
      <PageContainer className={styles.inner}>
        <Eyebrow tone="on-dark">Next project</Eyebrow>
        <Link to={`/work/${nextProject.slug}`} className={styles.nextLink}>
          {nextProject.title} →
        </Link>
        <Link to="/home#selected-work" className={styles.backLink}>
          ← Back to all work
        </Link>
      </PageContainer>
    </footer>
  );
}
