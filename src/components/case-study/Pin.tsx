import type { CSSProperties } from 'react';
import { cx } from '../../utils/cx';
import styles from './Pin.module.css';

interface PinProps {
  number: number;
  /** Absolutely positioned pins sit over a figure; the rest are inline badges. */
  style?: CSSProperties;
  className?: string;
}

/** Numbered marker tying a spot on a figure to a design decision. */
export function Pin({ number, style, className }: PinProps) {
  return (
    <span className={cx(styles.pin, style && styles.placed, className)} style={style} aria-hidden="true">
      {number}
    </span>
  );
}
