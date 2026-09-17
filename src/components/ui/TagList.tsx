import styles from './TagList.module.css';

interface TagListProps {
  tags: string[];
  tone?: 'default' | 'on-dark';
  className?: string;
}

/** Inline list of short labels separated by a middle dot, e.g.
 * "Design · Development · Accessibility-minded". */
export function TagList({ tags, tone = 'default', className }: TagListProps) {
  return (
    <p className={[styles.tags, styles[tone], className].filter(Boolean).join(' ')}>
      {tags.join(' · ')}
    </p>
  );
}
