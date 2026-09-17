import type { ReactNode } from 'react';
import styles from './MetaList.module.css';

interface MetaItem {
  label: string;
  value: ReactNode;
}

interface MetaListProps {
  items: MetaItem[];
  className?: string;
}

/** A bordered list of label/value rows — used for the "Stack / Based /
 * Status" specimen block and the case study "Role / Stack / Links" meta.
 * Rendered as a definition list so the label/value relationship is
 * conveyed to assistive tech, not just implied by layout. */
export function MetaList({ items, className }: MetaListProps) {
  return (
    <dl className={[styles.list, className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <div className={styles.row} key={item.label}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
