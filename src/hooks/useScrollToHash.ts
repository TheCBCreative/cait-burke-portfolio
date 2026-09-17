import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router doesn't scroll to an in-page anchor on navigation the way a
 * plain <a href="#id"> does — this restores that behavior for links like
 * "/home#selected-work" coming from another page (e.g. a case study's
 * "Back to all work" link).
 */
export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const target = document.querySelector(hash);
    target?.scrollIntoView();
  }, [hash, pathname]);
}
