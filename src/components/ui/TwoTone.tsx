import type { Heading } from '../../data/types';
import styles from './TwoTone.module.css';

/** A heading's lead, then its emphasis in the accent italic on its own line. */
export function TwoTone({ heading }: { heading: Heading }) {
  return (
    <>
      {heading.lead}
      {heading.emphasis && (
        <>
          {' '}
          <Emphasis>{heading.emphasis}</Emphasis>
        </>
      )}
    </>
  );
}

export function Emphasis({ children }: { children: string }) {
  return <em className={styles.emphasis}>{children}</em>;
}
