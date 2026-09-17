import { Link } from 'react-router-dom';
import { Eyebrow } from '../ui';
import { PageContainer } from '../layout';
import { CASE_STUDIES } from '../../data/projects';
import styles from './CaseStudyFooterNav.module.css';

interface CaseStudyFooterNavProps {
  nextProjectSlug: string;
}

/** Closes out a case study by pointing to the other project. */
export function CaseStudyFooterNav({ nextProjectSlug }: CaseStudyFooterNavProps) {
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
