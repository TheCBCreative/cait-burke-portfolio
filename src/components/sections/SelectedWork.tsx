import { SectionHeading } from '../ui';
import { PageContainer } from '../layout';
import { PROJECT_SUMMARIES } from '../../data/projects';
import { WorkCard } from './WorkCard';
import styles from './SelectedWork.module.css';

/** The project grid linking out to each case study. */
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
          {PROJECT_SUMMARIES.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
