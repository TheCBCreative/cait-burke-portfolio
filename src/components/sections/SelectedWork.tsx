import { SectionHeading } from '../ui';
import { PageContainer } from '../layout';
import { PROJECTS } from '../../data/projects';
import { WorkCard } from './WorkCard';
import { WorkTeaser } from './WorkTeaser';
import styles from './SelectedWork.module.css';

export function SelectedWork() {
  return (
    <section id="selected-work" className={styles.section} aria-labelledby="selected-work-heading">
      <PageContainer className={styles.inner}>
        <SectionHeading
          eyebrow="Selected work"
          headingId="selected-work-heading"
          heading="Different projects, one throughline."
        />
        <ul className={styles.grid}>
          {PROJECTS.map((project, index) => (
            <WorkCard key={project.slug} project={project} revealDelay={index * 200} />
          ))}
          <WorkTeaser />
        </ul>
      </PageContainer>
    </section>
  );
}
