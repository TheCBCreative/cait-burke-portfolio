import { useEffect } from 'react';

/**
 * Sets the browser tab title for the page that calls it. This is an SPA —
 * without this, every route would keep whatever <title> shipped in
 * index.html, so a case study tab would read the same generic title as
 * the homepage. Resets to the site-wide default on unmount so navigating
 * away (e.g. via browser back) doesn't leave a stale title behind.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
