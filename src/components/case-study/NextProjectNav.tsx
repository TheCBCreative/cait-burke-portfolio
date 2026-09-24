import { Link } from 'react-router-dom';
import { Eyebrow, Reveal, Divider } from '../ui';
import { PageContainer } from '../layout';
import { getNextProject } from '../../data/projects';
import styles from './NextProjectNav.module.css';

/** Links to the next case study, or back to the grid after the last one. */
export function NextProjectNav({ currentSlug }: { currentSlug: string }) {
  const nextProject = getNextProject(currentSlug);

  return (
    <nav className={styles.nav} aria-label="More work">
      <PageContainer>
        <Reveal className={styles.inner}>
          {nextProject ? (
            <>
              <Eyebrow tone="on-dark">Next project</Eyebrow>
              <Link to={`/work/${nextProject.slug}`} className={styles.primaryLink}>
                {nextProject.title} →
              </Link>
              <Link to="/home#selected-work" className={styles.backLink}>
                ← Back to all work
              </Link>
            </>
          ) : (
            <>
              <Eyebrow tone="on-dark">More work</Eyebrow>
              <Link to="/home#selected-work" className={styles.primaryLink}>
                View all work →
              </Link>
            </>
          )}
        </Reveal>
        <Divider tone="dark" />
      </PageContainer>
    </nav>
  );
}
