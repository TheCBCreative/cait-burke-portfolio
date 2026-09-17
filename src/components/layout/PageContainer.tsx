import type { ReactNode } from 'react';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centers content and applies the site's responsive side padding —
 * every section's content sits inside one of these instead of each
 * section re-declaring its own max-width and padding. */
export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={[styles.container, className].filter(Boolean).join(' ')}>{children}</div>;
}
