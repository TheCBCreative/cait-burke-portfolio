import { useMediaQuery } from '../../hooks/useMediaQuery';
import { FernClip } from '../media/FernClip';
import styles from './LandingBackground.module.css';

const DESKTOP_QUERY = '(min-width: 700px)';

/**
 * The Landing page's full-bleed background: a looping fern clip, switching
 * between a portrait crop (mobile) and a landscape crop (desktop).
 */
export function LandingBackground() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const variant = isDesktop ? 'desktop' : 'mobile';

  return (
    <div className={styles.background} aria-hidden="true">
      {/* Keyed so a breakpoint change remounts the clip with its new
          source, instead of hot-swapping `src` on a live video element. */}
      <FernClip key={variant} variant={variant} className={styles.media} />
    </div>
  );
}
