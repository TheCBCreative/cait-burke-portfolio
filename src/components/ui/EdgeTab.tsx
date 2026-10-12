import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cx } from '../../utils/cx';
import { scrolledPast } from '../../utils/scrollMotion';
import { FernClip } from '../media/FernClip';
import styles from './EdgeTab.module.css';

interface EdgeTabProps {
  label: string;
  tone?: 'default' | 'on-dark';
  className?: string;
}

/**
 * Decorative fern-filled strip down a hero's left edge (desktop only). As the
 * hero scrolls away the footage pans from its top to its base and a thin line
 * grows down the strip.
 */
export function EdgeTab({ label, tone = 'default', className }: EdgeTabProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Matches the breakpoint in EdgeTab.module.css. Below it the tab is hidden, so the clip isn't mounted or downloaded.
  const shown = useMediaQuery('(min-width: 1100px)');

  useEffect(() => {
    const tab = ref.current;
    if (!tab) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = tab.getBoundingClientRect();
      if (!box.height) return;
      tab.style.setProperty('--progress', String(scrolledPast(window.scrollY, box.bottom + window.scrollY)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={cx(styles.tab, styles[tone], className)} aria-hidden="true">
      {shown && <FernClip className={styles.clip} />}
      <div className={styles.scrim} />
      <span className={styles.progress} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
