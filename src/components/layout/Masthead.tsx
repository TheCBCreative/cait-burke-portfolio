import { Link } from 'react-router-dom';
import { PageContainer } from './PageContainer';
import styles from './Masthead.module.css';

/** The case study header: site name and a link back to the work grid. */
export function Masthead() {
  return (
    <header className={styles.masthead}>
      <PageContainer className={styles.inner}>
        <Link to="/home" className={styles.link}>
          Cait Burke Portfolio
        </Link>
        <Link to="/home#selected-work" className={styles.backLink}>
          ← Back to all work
        </Link>
      </PageContainer>
    </header>
  );
}
