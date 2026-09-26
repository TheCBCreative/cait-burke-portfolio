import type { Heading } from '../../data/types';
import { cx } from '../../utils/cx';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';
import { TwoTone } from './TwoTone';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow: string;
  heading: Heading;
  headingId?: string;
  tone?: 'default' | 'on-dark';
  size?: 'h2' | 'lg' | 'xl';
  /** See Reveal's `revealed`. */
  revealed?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  headingId,
  tone = 'default',
  size = 'h2',
  revealed,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cx(styles.wrap, className)} revealed={revealed}>
      <Eyebrow tone={tone === 'on-dark' ? 'accent-on-dark' : 'accent'}>{eyebrow}</Eyebrow>
      <h2 id={headingId} className={cx(styles.heading, styles[size], styles[tone])}>
        <TwoTone heading={heading} />
      </h2>
    </Reveal>
  );
}
