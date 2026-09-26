import { SectionHeading } from '../ui';
import { PageContainer } from '../layout';
import { PROJECTS } from '../../data/projects';
import { SITE } from '../../data/site';
import { WorkRow } from './WorkRow';
import styles from './SelectedWork.module.css';

export function SelectedWork() {
  return (
    <section id="selected-work" className={styles.section} aria-labelledby="selected-work-heading">
      <PageContainer className={styles.inner}>
        <header className={styles.header}>
          <SectionHeading
            eyebrow="Selected work"
            headingId="selected-work-heading"
            heading={SITE.workHeading}
            size="lg"
          />
          <p className={styles.count}>{String(PROJECTS.length).padStart(2, '0')} case studies</p>
        </header>
        <ul className={styles.rows}>
          {PROJECTS.map((project, index) => (
            <WorkRow key={project.slug} project={project} reversed={index % 2 === 1} />
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
