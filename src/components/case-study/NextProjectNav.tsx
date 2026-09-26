import { Link } from 'react-router-dom';
import { Eyebrow, Reveal } from '../ui';
import { PageContainer } from '../layout';
import { getNextProject } from '../../data/projects';
import { cx } from '../../utils/cx';
import surfaces from '../../styles/surfaces.module.css';
import styles from './NextProjectNav.module.css';

/** A large link to the next case study. */
export function NextProjectNav({ currentSlug }: { currentSlug: string }) {
  const nextProject = getNextProject(currentSlug);
  if (!nextProject || nextProject.slug === currentSlug) return null;

  return (
    <nav className={cx(styles.nav, surfaces.ink)} aria-label="Next project">
      <PageContainer inset>
        <Reveal className={styles.inner}>
          <Eyebrow tone="on-dark">Next project</Eyebrow>
          <Link to={`/work/${nextProject.slug}`} className={styles.link}>
            {nextProject.title}
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </Link>
          <p className={styles.category}>{nextProject.category}</p>
        </Reveal>
      </PageContainer>
    </nav>
  );
}
