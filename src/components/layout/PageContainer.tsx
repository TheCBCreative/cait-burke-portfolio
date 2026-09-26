import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  children: ReactNode;
  /** Indent the start on desktop to clear the EdgeTab and line up with hero text. */
  inset?: boolean;
  className?: string;
}

/** Centers content at the site's max width with responsive side padding. */
export function PageContainer({ children, inset = false, className }: PageContainerProps) {
  return <div className={cx(styles.container, inset && styles.inset, className)}>{children}</div>;
}
