import { useEffect, type RefObject } from 'react';
import { scrollTransform, viewProgress, type ScrollMotion } from '../utils/scrollMotion';

const supportsViewTimeline = () => typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: view()');

/**
 * Ties an image's transform to its position in the viewport. Browsers with
 * scroll-driven animations do this in CSS (styles/scrollLinked.module.css);
 * this is the fallback, and it only listens while the element is on screen.
 */
export function useScrollLinked(ref: RefObject<HTMLElement | null>, motion: ScrollMotion) {
  useEffect(() => {
    const node = ref.current;
    if (!node || supportsViewTimeline() || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const { y, scale } = scrollTransform(viewProgress(box.top, box.height, window.innerHeight), motion);
      node.style.transform = `translateY(${y}px) scale(${scale})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        schedule();
        window.addEventListener('scroll', schedule, { passive: true });
      } else {
        window.removeEventListener('scroll', schedule);
      }
    });
    observer.observe(node);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, [ref, motion]);
}
