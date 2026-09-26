import { cx } from '../../utils/cx';
import { FernClip } from '../media/FernClip';
import styles from './EdgeTab.module.css';

interface EdgeTabProps {
  label: string;
  tone?: 'default' | 'on-dark';
  className?: string;
}

/** Decorative fern-filled strip down a hero's left edge (desktop only). */
export function EdgeTab({ label, tone = 'default', className }: EdgeTabProps) {
  return (
    <div className={cx(styles.tab, styles[tone], className)} aria-hidden="true">
      <FernClip className={styles.clip} />
      <div className={styles.scrim} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
