import { useEffect, useRef, useState } from 'react';

/** Becomes true once the element's top is 15% up from the bottom of the
 * viewport (or it's already been scrolled past), and stays true. */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(() => !('IntersectionObserver' in window));

  useEffect(() => {
    const node = ref.current;
    if (!node || isRevealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isRevealed]);

  return { ref, isRevealed };
}
