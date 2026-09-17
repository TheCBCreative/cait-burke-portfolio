import styles from './WorkTeaser.module.css';

/**
 * A slim teaser strip beneath the Selected Work grid, signaling that more
 * case studies are on the way. Deliberately lighter than a `WorkCard` —
 * it's a placeholder for what's next, not a project to click into, so it
 * reads as a strip rather than competing with real project tiles.
 */
export function WorkTeaser() {
  return (
    <li className={styles.stripe}>
      <span className={styles.plus} aria-hidden="true">
        +
      </span>
      <span className={styles.title}>More projects</span>
      <span className={styles.tag}>Coming soon</span>
    </li>
  );
}
