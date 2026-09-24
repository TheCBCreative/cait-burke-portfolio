import type { ElementType, ReactNode } from 'react';
import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  /** Render as a heading element when this eyebrow doubles as a section's
   * accessible label; defaults to a plain span for decorative use. */
  as?: ElementType;
  tone?: 'faint' | 'accent' | 'on-dark' | 'on-accent';
  className?: string;
}

/** Small uppercase mono label used above headings throughout the site
 * (e.g. "ABOUT", "01 — THE CONTEXT"). */
export function Eyebrow({ children, as: Tag = 'span', tone = 'faint', className }: EyebrowProps) {
  return (
    <Tag className={[styles.eyebrow, styles[tone], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
