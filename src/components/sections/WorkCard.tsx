import { Link } from 'react-router-dom';
import { ImagePlaceholder } from '../ui';
import type { ProjectSummary } from '../../data/types';
import styles from './WorkCard.module.css';

interface WorkCardProps {
  project: ProjectSummary;
}

/** One "Selected Work" thumbnail — the whole card links to that project's
 * case study. */
export function WorkCard({ project }: WorkCardProps) {
  return (
    <li className={styles.card}>
      <Link to={`/work/${project.slug}`} className={styles.link}>
        <ImagePlaceholder image={project.thumbnail} aspectRatio="4 / 3" />
        <div className={styles.meta}>
          <span className={styles.index}>{project.index}</span>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.tag}>{project.tag}</span>
        </div>
      </Link>
    </li>
  );
}
