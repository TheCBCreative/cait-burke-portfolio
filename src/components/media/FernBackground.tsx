import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FernClip } from './FernClip';
import styles from './FernBackground.module.css';

/** The fern footage filling its positioned parent, as a decorative background. */
export function FernBackground() {
  const variant = useMediaQuery('(min-width: 700px)') ? 'desktop' : 'mobile';

  return (
    <div className={styles.background} aria-hidden="true">
      {/* Keyed so a breakpoint change loads the other clip fresh. */}
      <FernClip key={variant} variant={variant} className={styles.media} />
    </div>
  );
}
