import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { cx } from '../../utils/cx';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  /** rise: headings. fade: text and grid items. wipe: images. */
  variant?: 'rise' | 'fade' | 'wipe';
  /** Milliseconds; stagger a list with `index * n`. */
  delay?: number;
  as?: 'div' | 'li';
  /** Overrides the element's own trigger, so a section can reveal its pieces together. */
  revealed?: boolean;
  className?: string;
}

/** Animates its contents in the first time they scroll into view. */
export function Reveal({ children, variant = 'rise', delay = 0, as: Tag = 'div', revealed, className }: RevealProps) {
  const { ref, isRevealed: isInView } = useReveal<HTMLDivElement & HTMLLIElement>();
  const isRevealed = revealed ?? isInView;

  return (
    <Tag
      ref={ref}
      className={cx(styles[variant], className)}
      data-revealed={isRevealed || undefined}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
