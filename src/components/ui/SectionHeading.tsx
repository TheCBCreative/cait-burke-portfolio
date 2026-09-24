import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow: string;
  heading: ReactNode;
  headingId?: string;
  tone?: 'default' | 'on-dark';
  /** See Reveal's `revealed`. */
  revealed?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  headingId,
  tone = 'default',
  revealed,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cx(styles.wrap, className)} revealed={revealed}>
      <Eyebrow tone={tone === 'on-dark' ? 'on-dark' : 'faint'}>{eyebrow}</Eyebrow>
      <h2 id={headingId} className={cx(styles.heading, styles[tone])}>
        {heading}
      </h2>
    </Reveal>
  );
}
