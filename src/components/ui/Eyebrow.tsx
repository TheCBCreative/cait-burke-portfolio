import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  tone?: 'faint' | 'accent' | 'on-dark' | 'accent-on-dark';
  className?: string;
}

/** Small uppercase label above a heading. */
export function Eyebrow({ children, tone = 'faint', className }: EyebrowProps) {
  return <span className={cx(styles.eyebrow, styles[tone], className)}>{children}</span>;
}
