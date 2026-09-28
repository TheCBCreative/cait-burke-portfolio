import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './BrowserFrame.module.css';

interface BrowserFrameProps {
  /** Shown in the address bar, e.g. "thecbcreative.com". */
  url: string;
  children: ReactNode;
  className?: string;
}

/** A minimal browser window, so a recording reads as the site being shown rather than part of this one. */
export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <div className={cx(styles.frame, className)}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots} />
        <span className={styles.url}>{url}</span>
      </div>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
