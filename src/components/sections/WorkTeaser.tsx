import styles from './WorkTeaser.module.css';

/** "More projects coming soon" strip under the work grid. */
export function WorkTeaser() {
  return (
    <li className={styles.teaser}>
      <span className={styles.plus} aria-hidden="true">
        +
      </span>
      <span className={styles.title}>More projects</span>
      <span className={styles.note}>Coming soon</span>
    </li>
  );
}
