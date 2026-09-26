import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../utils/cx';
import { ExternalLink } from './ExternalLink';
import styles from './Button.module.css';

const ARROWS = { right: '→', external: '↗' } as const;

interface ButtonProps {
  children: ReactNode;
  /** Omit for a not-yet-live link: it renders as plain, dimmed text. */
  href?: string;
  variant?: 'solid' | 'outline' | 'text';
  tone?: 'default' | 'on-dark';
  /** Trailing arrow that nudges on hover and focus. */
  arrow?: keyof typeof ARROWS;
  /** Animate the page change with the View Transitions API (internal links). */
  viewTransition?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  variant = 'text',
  tone = 'default',
  arrow,
  viewTransition,
  className,
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], styles[tone], !href && styles.disabled, className);
  const content = (
    <>
      {children}
      {arrow && (
        <span className={cx(styles.arrow, styles[arrow])} aria-hidden="true">
          {ARROWS[arrow]}
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <span className={classes}>
        {content}
        <span className="visually-hidden"> (coming soon)</span>
      </span>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes} viewTransition={viewTransition}>
        {content}
      </Link>
    );
  }

  if (href.startsWith('http')) {
    return (
      <ExternalLink href={href} className={classes}>
        {content}
      </ExternalLink>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
