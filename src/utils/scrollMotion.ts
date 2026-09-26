const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/** 0 as an element's top enters the bottom of the viewport, 1 as its bottom leaves the top. */
export function viewProgress(top: number, height: number, viewportHeight: number): number {
  return clamp((viewportHeight - top) / (viewportHeight + height));
}

export type ScrollMotion = 'drift' | 'settle';

/**
 * drift: moves up 80px and settles from 1.08 to 1 across the viewport.
 * settle: scale only, 1.04 to 1 by the time the element is centered.
 */
export function scrollTransform(progress: number, motion: ScrollMotion): { y: number; scale: number } {
  if (motion === 'settle') {
    return { y: 0, scale: 1.04 - 0.04 * clamp(progress * 2) };
  }
  return { y: 40 - 80 * progress, scale: 1.08 - 0.08 * progress };
}

/** How far the page has scrolled past an element whose bottom sits `bottom` px from the top of the document. */
export function scrolledPast(scrollY: number, bottom: number): number {
  return bottom <= 0 ? 0 : clamp(scrollY / bottom);
}
