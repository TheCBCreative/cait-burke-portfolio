import type { ReactNode } from 'react';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Set when the link's own content isn't enough on its own for screen
   * readers (e.g. an icon-only link) — becomes the accessible name instead
   * of the visible content, so the "opens in a new tab" note is folded
   * into it rather than appended as a separate (and then unreachable)
   * hidden span. */
  ariaLabel?: string;
}

/** Opens in a new tab, and says so to screen readers. */
export function ExternalLink({ href, children, className, ariaLabel }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel ? `${ariaLabel} (opens in a new tab)` : undefined}
    >
      {children}
      {!ariaLabel && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}
