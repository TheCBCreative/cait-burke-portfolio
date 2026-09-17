import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  /** Omit to render a disabled placeholder (e.g. a demo link before it's
   * deployed) — the label still shows, but it isn't clickable or announced
   * as a link to assistive tech. */
  href?: string;
  variant?: 'solid' | 'text';
  /** Use "on-dark" when the button sits on a dark section (Landing,
   * Contact) so its text stays readable against that background. */
  tone?: 'default' | 'on-dark';
  className?: string;
}

const isInternalPath = (href: string) => href.startsWith('/');

/** A link styled as either a solid CTA button or an inline text link with
 * an arrow. Renders as a real anchor (internal via react-router, external
 * with a plain <a>) whenever an href is given, and as an inert, visually
 * matching element when it isn't — so a not-yet-live link never looks or
 * behaves like a working one. */
export function Button({ children, href, variant = 'text', tone = 'default', className }: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[tone], className].filter(Boolean).join(' ');

  if (!href) {
    return (
      <span className={classes} aria-disabled="true">
        {children}
      </span>
    );
  }

  if (isInternalPath(href)) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
