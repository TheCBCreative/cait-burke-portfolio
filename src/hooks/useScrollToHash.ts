import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the URL's #hash after navigation (React Router doesn't), or to the top without one. */
export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [hash, pathname]);
}
