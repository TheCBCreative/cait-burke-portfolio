import { useParams } from 'react-router-dom';
import { ContactFooter, Masthead, SkipLink } from '../components/layout';
import {
  Architecture,
  BreakImage,
  CaseStudyCallout,
  CaseStudyHero,
  CaseStudySection,
  CodeDecisions,
  DesignDecisions,
  HeroImage,
  NextProjectNav,
  NextSteps,
  NoteRow,
  StatList,
  Tradeoffs,
} from '../components/case-study';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getProject } from '../data/projects';
import { SITE } from '../data/site';
import type { Project } from '../data/types';
import { NotFoundPage } from './NotFoundPage';

export function CaseStudyPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const project = getProject(slug);

  if (!project) {
    return <NotFoundPage />;
  }

  // Keyed so switching projects remounts the page and replays its animations.
  return <CaseStudy key={project.slug} project={project} />;
}

function CaseStudy({ project }: { project: Project }) {
  const { caseStudy: study } = project;
  useDocumentTitle(`${project.title} — ${SITE.name}`);

  return (
    <>
      <SkipLink />
      <Masthead />
      <main id="main-content">
        <CaseStudyHero project={project} />
        <HeroImage image={study.heroImage} slug={project.slug} />
        <CaseStudyCallout content={study.callout} />

        <CaseStudySection
          id="context"
          eyebrow="01 — The context"
          heading={study.context.heading}
          intro={study.context.body}
          surface="paper"
          aside={<StatList stats={study.context.stats} note={study.context.statsNote} />}
        />

        <CaseStudySection id="design" eyebrow="02 — Design decisions" heading={study.design.heading}>
          <DesignDecisions figure={study.design.figure} decisions={study.design.decisions} />
        </CaseStudySection>

        <CaseStudySection
          id="engineering"
          eyebrow="03 — Engineering decisions"
          heading={study.engineering.heading}
          surface="ink"
        >
          <Architecture flow={study.engineering.flow} services={study.engineering.services} />
          <CodeDecisions decisions={study.engineering.decisions} />
          <NoteRow label="Tested" tone="on-dark">
            {study.engineering.testing}
          </NoteRow>
        </CaseStudySection>

        <CaseStudySection
          id="left-out"
          eyebrow="04 — What I left out"
          heading={study.leftOut.heading}
          intro={study.leftOut.intro}
        >
          <Tradeoffs items={study.leftOut.items} />
        </CaseStudySection>

        <BreakImage image={study.breakImage} />

        <CaseStudySection
          id="outcome"
          eyebrow="05 — The outcome"
          heading={study.outcome.heading}
          headingSize="h2-sm"
          intro={study.outcome.body}
          leadFooter={
            <NoteRow label={study.outcome.proof.value} display>
              {study.outcome.proof.label}
            </NoteRow>
          }
          aside={<NextSteps items={study.outcome.next} />}
        />
      </main>
      <NextProjectNav currentSlug={project.slug} />
      <ContactFooter variant="compact" />
    </>
  );
}
