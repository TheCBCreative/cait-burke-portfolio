import { Eyebrow, MetaList, LinkStack, EdgeTab, EntranceLines, ScrollCue, entrance, entranceStep as step } from '../ui';
import { PageContainer } from '../layout';
import type { Project } from '../../data/types';
import { cx } from '../../utils/cx';
import styles from './CaseStudyHero.module.css';

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <header className={cx(styles.hero, entrance.heroPace)}>
      <EdgeTab label="Portfolio" />
      <PageContainer className={styles.inner}>
        <span className={entrance.enter} style={step(0)}>
          <Eyebrow tone="accent">
            {project.index} · {project.category}
          </Eyebrow>
        </span>
        <h1 className={styles.title}>
          <EntranceLines lines={[project.title]} firstStep={1} />
        </h1>
        <p className={cx(styles.summary, entrance.enter)} style={step(2)}>
          {project.summary}
        </p>

        <MetaList
          className={styles.meta}
          rowClassName={entrance.enter}
          rowStyle={(index) => step(3 + index)}
          items={[
            { label: 'Role', value: project.meta.role },
            { label: 'Stack', value: project.meta.stack },
            { label: 'Links', value: <LinkStack links={project.meta.links} /> },
          ]}
        />
      </PageContainer>
      <ScrollCue step={7} />
    </header>
  );
}
