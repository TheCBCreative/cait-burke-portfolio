import type { CSSProperties } from 'react';
import { FernClip } from '../media/FernClip';
import styles from './EdgeTab.module.css';

interface EdgeTabProps {
  label: string;
  /** 'default' for a tab on a light section; 'on-dark' for one over a
   * dark or video background, where a lighter border reads better than
   * a hard edge. */
  tone?: 'default' | 'on-dark';
  /** Escape hatch for a one-off position tweak — e.g. extending the tab
   * upward to bleed through a masthead that sits above its section. */
  style?: CSSProperties;
}

/**
 * A slim vertical panel along a hero section's left edge — a decorative
 * spine/brand mark, filled with a cropped loop of the same fern clip used
 * on the Landing background, so the motif recurs across both heroes. It's
 * `aria-hidden` because the same name is always present in the section's
 * real heading content; this is a visual echo, not new information.
 * Desktop-only: below the widescreen breakpoint the space is worth more
 * as ordinary content padding.
 */
export function EdgeTab({ label, tone = 'default', style }: EdgeTabProps) {
  const toneClass = tone === 'on-dark' ? styles.onDark : styles.default;

  return (
    <div className={[styles.tab, toneClass].join(' ')} style={style} aria-hidden="true">
      <FernClip className={styles.clip} />
      <div className={styles.scrim} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
