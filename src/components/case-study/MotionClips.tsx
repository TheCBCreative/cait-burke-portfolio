import { LoopingClip } from '../media';
import { Reveal } from '../ui';
import type { Clip } from '../../data/types';
import styles from './MotionClips.module.css';

/** Screen recordings of the live site, each with a title and caption. */
export function MotionClips({ clips }: { clips: Clip[] }) {
  return (
    <ul className={styles.clips}>
      {clips.map((clip, index) => (
        <Reveal as="li" variant="fade" delay={(index % 2) * 150} key={clip.title} className={styles.clip}>
          <LoopingClip media={clip.media} className={styles.media} />
          <h3 className={styles.title}>{clip.title}</h3>
          <p className={styles.body}>{clip.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}
