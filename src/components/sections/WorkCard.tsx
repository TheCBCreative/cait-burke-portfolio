import { Link } from 'react-router-dom';
import { ImageFrame, Reveal } from '../ui';
import type { Project } from '../../data/types';
import { cx } from '../../utils/cx';
import hoverZoom from '../../styles/hoverZoom.module.css';
import styles from './WorkCard.module.css';

interface WorkCardProps {
  project: Project;
  revealDelay?: number;
}

export function WorkCard({ project, revealDelay }: WorkCardProps) {
  return (
    <li>
      <Link to={`/work/${project.slug}`} className={cx(styles.link, hoverZoom.trigger)}>
        <Reveal variant="wipe" delay={revealDelay}>
          {/* Its own layer, so the hover zoom and the reveal's scale don't share a transform. */}
          <div className={styles.thumbnailFrame}>
            <ImageFrame
              image={project.thumbnail}
              aspectRatio="4 / 3"
              className={cx(styles.thumbnail, hoverZoom.target)}
            />
          </div>
        </Reveal>
        <div className={styles.meta}>
          <span className={styles.index}>{project.index}</span>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.category}>{project.category}</span>
          <ul className={styles.skills}>
            {project.skills.map((skill) => (
              <li key={skill} className={styles.skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}
