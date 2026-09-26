import { Fragment } from 'react';
import type { ArchitectureNode } from '../../data/types';
import { cx } from '../../utils/cx';
import styles from './Architecture.module.css';

interface ArchitectureProps {
  flow: ArchitectureNode[];
  services: ArchitectureNode[];
}

/** The system as a row of boxes: the main flow with arrows, then supporting services. */
export function Architecture({ flow, services }: ArchitectureProps) {
  const node = (item: ArchitectureNode) => (
    <li key={item.name} className={cx(styles.node, item.highlight && styles.highlight)}>
      <span className={styles.name}>{item.name}</span>
      <span className={styles.note}>{item.note}</span>
    </li>
  );

  return (
    <div className={styles.diagram}>
      <ol className={styles.flow} aria-label="Main flow">
        {flow.map((item, index) => (
          <Fragment key={item.name}>
            {index > 0 && (
              <li className={styles.arrow} aria-hidden="true">
                →
              </li>
            )}
            {node(item)}
          </Fragment>
        ))}
      </ol>
      <span className={styles.separator} aria-hidden="true">
        ·
      </span>
      <ul className={styles.flow} aria-label="Supporting services">
        {services.map(node)}
      </ul>
    </div>
  );
}
