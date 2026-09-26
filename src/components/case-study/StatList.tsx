import { Reveal } from '../ui';
import type { Stat } from '../../data/types';
import styles from './StatList.module.css';

interface StatListProps {
  stats: Stat[];
  note: string;
}

export function StatList({ stats, note }: StatListProps) {
  return (
    <Reveal variant="fade" delay={200} className={styles.wrap}>
      <dl className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.value} className={styles.stat}>
            <dt className={styles.value}>{stat.value}</dt>
            <dd className={styles.label}>{stat.label}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.note}>{note}</p>
    </Reveal>
  );
}
