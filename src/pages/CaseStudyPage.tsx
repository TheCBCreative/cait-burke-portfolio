import { useParams } from 'react-router-dom';
import { ContactFooter, Masthead, SkipLink } from '../components/layout';
import {
  CaseStudyHero,
  CaseStudyCallout,
  ImageBlock,
  CaseStudySection,
  ImagePair,
  NextProjectNav,
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
  useDocumentTitle(`${project.title} — ${SITE.name}`);

  return (
    <>
      <SkipLink />
      <Masthead />
      <main id="main-content">
        <CaseStudyHero project={project} />
        <CaseStudyCallout content={project.callout} />
        <ImageBlock image={project.heroImage} />
        <CaseStudySection content={project.sections[0]} background="paper" />
        <CaseStudySection content={project.sections[1]} background="surface" />
        <ImagePair images={project.imagePair} />
        <CaseStudySection content={project.sections[2]} background="paper" />
      </main>
      <NextProjectNav currentSlug={project.slug} />
      <ContactFooter showHeading={false} />
    </>
  );
}
