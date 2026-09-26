import { Button, EdgeTab, EntranceLines, Eyebrow, ScrollCue, entrance, entranceStep as step } from '../ui';
import { PageContainer } from '../layout';
import type { Project } from '../../data/types';
import { cx } from '../../utils/cx';
import styles from './CaseStudyHero.module.css';

export function CaseStudyHero({ project }: { project: Project }) {
  const { caseStudy } = project;
  const glance = [
    { label: 'Role', value: caseStudy.role },
    { label: 'Stack', value: caseStudy.stack },
    {
      label: 'Links',
      value: (
        <span className={styles.links}>
          <Button href={project.live.href} arrow="external">
            {project.live.label}
          </Button>
          <Button href={caseStudy.github} arrow="external">
            GitHub
          </Button>
        </span>
      ),
    },
  ];

  return (
    <header className={cx(styles.hero, entrance.heroPace)}>
      <EdgeTab label="Portfolio" className={styles.tab} />
      <PageContainer inset className={styles.inner}>
        <span className={entrance.enter} style={step(0)}>
          <Eyebrow tone="accent">
            {project.index} · {project.category}
          </Eyebrow>
        </span>
        <h1 className={styles.title}>
          <EntranceLines lines={[project.title]} firstStep={1} />
        </h1>
        <p className={cx(styles.dek, entrance.enter)} style={step(2)}>
          {caseStudy.dek}
        </p>

        <dl className={styles.glance}>
          {glance.map((item, index) => (
            <div key={item.label} className={cx(styles.glanceItem, entrance.enter)} style={step(3 + index)}>
              <dt className={styles.glanceLabel}>{item.label}</dt>
              <dd className={styles.glanceValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </PageContainer>
      <ScrollCue step={7} />
    </header>
  );
}
