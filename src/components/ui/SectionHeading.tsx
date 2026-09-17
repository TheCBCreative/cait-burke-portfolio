import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow: string;
  heading: ReactNode;
  /** Heading level — keep this matched to the page's real outline rather
   * than choosing by visual size alone. */
  level?: 2 | 3;
  /** Set when a parent landmark needs `aria-labelledby` to point at this
   * heading. */
  headingId?: string;
  className?: string;
}

/** The "eyebrow + heading" pattern repeated at the top of every content
 * section (About, Selected Work, each case study section). */
export function SectionHeading({ eyebrow, heading, level = 2, headingId, className }: SectionHeadingProps) {
  const HeadingTag = level === 2 ? 'h2' : 'h3';
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <HeadingTag id={headingId} className={level === 2 ? styles.h2 : styles.h3}>
        {heading}
      </HeadingTag>
    </div>
  );
}
