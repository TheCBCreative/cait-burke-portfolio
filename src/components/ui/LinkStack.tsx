import type { LinkItem } from '../../data/types';
import { ExternalLink } from './ExternalLink';
import styles from './LinkStack.module.css';

interface LinkStackProps {
  links: LinkItem[];
}

export function LinkStack({ links }: LinkStackProps) {
  return (
    <span className={styles.stack}>
      {links.map((link) => (
        <ExternalLink key={link.href} href={link.href}>
          {link.label}
        </ExternalLink>
      ))}
    </span>
  );
}
