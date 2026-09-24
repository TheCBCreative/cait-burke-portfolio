import { cx } from '../../utils/cx';
import styles from './TagList.module.css';

interface TagListProps {
  tags: string[];
  tone?: 'default' | 'on-dark';
  className?: string;
}

/** Short labels separated by middle dots, e.g. "Design · Development". */
export function TagList({ tags, tone = 'default', className }: TagListProps) {
  return <p className={cx(styles.tags, styles[tone], className)}>{tags.join(' · ')}</p>;
}
