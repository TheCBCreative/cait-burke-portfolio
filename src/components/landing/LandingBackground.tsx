import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FernClip } from '../media';
import styles from './LandingBackground.module.css';

export function LandingBackground() {
  const variant = useMediaQuery('(min-width: 700px)') ? 'desktop' : 'mobile';

  return (
    <div className={styles.background} aria-hidden="true">
      {/* Keyed so a breakpoint change loads the other clip fresh. */}
      <FernClip key={variant} variant={variant} className={styles.media} />
    </div>
  );
}
