import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../utils/cx';
import { ExternalLink } from './ExternalLink';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  /** Omit for a not-yet-live link: it renders as plain, dimmed text. */
  href?: string;
  variant?: 'solid' | 'text';
  tone?: 'default' | 'on-dark';
  className?: string;
}

export function Button({ children, href, variant = 'text', tone = 'default', className }: ButtonProps) {
  const classes = cx(styles.button, styles[variant], styles[tone], !href && styles.disabled, className);

  if (!href) {
    return (
      <span className={classes}>
        {children}
        <span className="visually-hidden"> (coming soon)</span>
      </span>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('http')) {
    return (
      <ExternalLink href={href} className={classes}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
