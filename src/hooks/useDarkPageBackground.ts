import { useEffect } from 'react';

/**
 * Paints the document dark while a full-bleed dark page is mounted, so
 * overscrolling past it doesn't flash the light default.
 */
export function useDarkPageBackground() {
  useEffect(() => {
    const targets = [document.documentElement, document.body];
    const previous = targets.map((el) => el.style.backgroundColor);
    targets.forEach((el) => (el.style.backgroundColor = 'var(--color-ink)'));
    return () => targets.forEach((el, i) => (el.style.backgroundColor = previous[i]));
  }, []);
}
