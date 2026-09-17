import styles from './Divider.module.css';

interface DividerProps {
  tone?: 'light' | 'dark';
  className?: string;
}

/** A single hairline rule. Decorative, so it's hidden from assistive tech —
 * the surrounding headings/landmarks already convey the section break. */
export function Divider({ tone = 'light', className }: DividerProps) {
  return <hr aria-hidden="true" className={[styles.divider, styles[tone], className].filter(Boolean).join(' ')} />;
}
