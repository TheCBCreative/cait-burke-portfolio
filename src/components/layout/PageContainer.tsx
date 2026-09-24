import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centers content at the site's max width with responsive side padding. */
export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cx(styles.container, className)}>{children}</div>;
}
