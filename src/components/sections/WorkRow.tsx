import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Eyebrow, Reveal, nudgeOnHover } from '../ui';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { Project } from '../../data/types';
import { cx } from '../../utils/cx';
import styles from './WorkRow.module.css';

interface WorkRowProps {
  project: Project;
  /** Media on the right instead of the left (desktop). */
  reversed?: boolean;
}

export function WorkRow({ project, reversed = false }: WorkRowProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const canPreview = Boolean(project.preview) && !prefersReducedMotion;
  const href = `/work/${project.slug}`;

  const play = () => void videoRef.current?.play().catch(() => {});
  const stop = () => videoRef.current?.pause();

  return (
    <li
      className={cx(styles.row, reversed && styles.reversed, nudgeOnHover)}
      onPointerEnter={canPreview ? play : undefined}
      onPointerLeave={canPreview ? stop : undefined}
      onFocus={canPreview ? play : undefined}
      onBlur={canPreview ? stop : undefined}
    >
      <Reveal variant="wipe" className={styles.mediaReveal}>
        {/* A second way into the case study for pointer users; the text link below is the accessible one. */}
        <Link to={href} viewTransition className={styles.media} tabIndex={-1} aria-hidden="true">
          <img
            src={project.thumbnail.src}
            alt=""
            loading="lazy"
            decoding="async"
            className={styles.image}
            style={{ objectPosition: project.thumbnail.position, viewTransitionName: `project-${project.slug}` }}
          />
          {canPreview && (
            <>
              <video ref={videoRef} className={styles.video} src={project.preview} muted loop playsInline preload="none" />
              <span className={styles.hint}>
                <svg viewBox="0 0 10 10" width="10" height="10" fill="currentColor" aria-hidden="true">
                  <path d="M2 1l7 4-7 4z" />
                </svg>
                Hover to preview
              </span>
            </>
          )}
        </Link>
      </Reveal>

      <Reveal variant="fade" delay={200} className={styles.copy}>
        <Eyebrow tone="accent">
          {project.index} — {project.category}
        </Eyebrow>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        <dl className={styles.highlights}>
          {(['design', 'engineering'] as const).map((kind) => (
            <div key={kind} className={styles.highlight}>
              <dt className={styles.highlightLabel}>{kind}</dt>
              {project.highlights[kind].map((item) => (
                <dd key={item} className={styles.highlightItem}>
                  {item}
                </dd>
              ))}
            </div>
          ))}
        </dl>

        <div className={styles.links}>
          <Button href={href} arrow="right" viewTransition>
            Read the case study
          </Button>
          <Button href={project.live.href} arrow="external">
            {project.live.label}
          </Button>
        </div>
      </Reveal>
    </li>
  );
}
