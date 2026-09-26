import type { ReactNode } from 'react';
import { Reveal } from '../ui';
import { cx } from '../../utils/cx';
import styles from './NoteRow.module.css';

interface NoteRowProps {
  label: string;
  children: ReactNode;
  tone?: 'default' | 'on-dark';
  /** Set the content in the display serif, for a headline-like proof point. */
  display?: boolean;
}

/** A labeled line under a hairline: the testing note, the outcome's proof point. */
export function NoteRow({ label, children, tone = 'default', display = false }: NoteRowProps) {
  return (
    <Reveal variant="fade" className={cx(styles.row, styles[tone])}>
      <p className={styles.label}>{label}</p>
      <div className={cx(styles.content, display && styles.display)}>{children}</div>
    </Reveal>
  );
}
