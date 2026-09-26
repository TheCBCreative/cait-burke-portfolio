import { Reveal } from '../ui';
import type { Tradeoff } from '../../data/types';
import styles from './Tradeoffs.module.css';

export function Tradeoffs({ items }: { items: Tradeoff[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <Reveal as="li" variant="fade" delay={index * 150} key={item.title} className={styles.item}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.body}>{item.body}</p>
          <p className={styles.tradeoff}>
            <span className={styles.label}>The tradeoff</span>
            {item.tradeoff}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}
