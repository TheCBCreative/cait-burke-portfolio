import type { LinkItem } from '../../data/types';
import styles from './LinkStack.module.css';

interface LinkStackProps {
  links: LinkItem[];
}

/** Renders one or more links stacked vertically — used as a MetaList
 * value when a case study has both a live link and a GitHub link. */
export function LinkStack({ links }: LinkStackProps) {
  return (
    <span className={styles.stack}>
      {links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ))}
    </span>
  );
}
