import { Link } from 'react-router-dom';
import { Eyebrow, Reveal } from '../ui';
import { PageContainer } from '../layout';
import { getNextProject } from '../../data/projects';
import { cx } from '../../utils/cx';
import surfaces from '../../styles/surfaces.module.css';
import styles from './NextProjectNav.module.css';

/** A large link to the next case study, or back to the work list after the last one. */
export function NextProjectNav({ currentSlug }: { currentSlug: string }) {
  const nextProject = getNextProject(currentSlug);
  const label = nextProject ? 'Next project' : 'More work';

  return (
    <nav className={cx(styles.nav, surfaces.ink)} aria-label={label}>
      <PageContainer inset>
        <Reveal className={styles.inner}>
          <Eyebrow tone="on-dark">{label}</Eyebrow>
          <Link
            to={nextProject ? `/work/${nextProject.slug}` : '/home#selected-work'}
            className={styles.link}
            viewTransition={Boolean(nextProject)}
          >
            {nextProject?.title ?? 'Back to all work'}
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </Link>
          {nextProject && <p className={styles.category}>{nextProject.category}</p>}
        </Reveal>
      </PageContainer>
    </nav>
  );
}
