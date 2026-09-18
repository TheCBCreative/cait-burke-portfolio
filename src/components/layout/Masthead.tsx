import { Link } from 'react-router-dom';
import { PageContainer } from './PageContainer';
import styles from './Masthead.module.css';

interface MastheadProps {
  /** "home" shows the static "Portfolio" mark; "case-study" shows a link
   * back to the work list instead. */
  variant: 'home' | 'case-study';
}

/** The slim header repeated at the top of every page (currently just the
 * case study pages — the homepage uses its hero's edge tab instead). */
export function Masthead({ variant }: MastheadProps) {
  return (
    <header className={styles.masthead}>
      <PageContainer className={styles.inner}>
        <Link to="/home" className={styles.name}>
          {variant === 'case-study' ? 'Cait Burke Portfolio' : 'Cait Burke'}
        </Link>
        {variant === 'home' ? (
          <span className={styles.tag}>Portfolio</span>
        ) : (
          <Link to="/home#selected-work" className={styles.backLink}>
            ← Back to all work
          </Link>
        )}
      </PageContainer>
    </header>
  );
}
