import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './MetaList.module.css';

interface MetaItem {
  label: string;
  value: ReactNode;
}

interface MetaListProps {
  items: MetaItem[];
  className?: string;
  /** Lets each row join an entrance sequence. */
  rowClassName?: string;
  rowStyle?: (index: number) => CSSProperties;
}

/** Label/value rows, as a definition list. */
export function MetaList({ items, className, rowClassName, rowStyle }: MetaListProps) {
  return (
    <dl className={cx(styles.list, className)}>
      {items.map((item, index) => (
        <div className={cx(styles.row, rowClassName)} style={rowStyle?.(index)} key={item.label}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
