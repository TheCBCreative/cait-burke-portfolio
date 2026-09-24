import { cx } from '../../utils/cx';
import styles from './Divider.module.css';

interface DividerProps {
  tone?: 'light' | 'dark';
  className?: string;
}

export function Divider({ tone = 'light', className }: DividerProps) {
  return <hr aria-hidden="true" className={cx(styles.divider, styles[tone], className)} />;
}
