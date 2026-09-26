import { Reveal } from '../ui';
import type { CodeDecision } from '../../data/types';
import styles from './CodeDecisions.module.css';

/** Engineering decisions as cards, each with the code that implements it. */
export function CodeDecisions({ decisions }: { decisions: CodeDecision[] }) {
  return (
    <ul className={styles.cards}>
      {decisions.map((decision, index) => (
        <Reveal as="li" variant="fade" delay={(index % 2) * 150} key={decision.title} className={styles.card}>
          <h3 className={styles.title}>{decision.title}</h3>
          <p className={styles.body}>{decision.body}</p>
          <pre className={styles.code} tabIndex={0} aria-label={`Code: ${decision.title}`}>
            <code>{decision.code}</code>
          </pre>
        </Reveal>
      ))}
    </ul>
  );
}
