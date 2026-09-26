import { Reveal } from '../ui';
import type { Decision } from '../../data/types';
import styles from './NextSteps.module.css';

export function NextSteps({ items }: { items: Decision[] }) {
  return (
    <Reveal variant="fade" delay={200} className={styles.wrap}>
      <h3 className={styles.label}>What I’d do next</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.title} className={styles.item}>
            <h4 className={styles.title}>{item.title}</h4>
            <p className={styles.body}>{item.body}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
