import { Navigate, useParams } from 'react-router-dom';
import { Masthead, SkipLink } from '../components/layout';
import {
  CaseStudyHero,
  CaseStudyCallout,
  ImageBlock,
  CaseStudySection,
  ImagePair,
  CaseStudyFooterNav,
} from '../components/case-study';
import { CASE_STUDIES } from '../data/projects';

/**
 * One template renders every case study — Blog Composer and The CB
 * Creative both come through here, driven entirely by their entry in
 * `CASE_STUDIES`. Adding a third project means adding data, not a page.
 */
export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? CASE_STUDIES[slug] : undefined;

  if (!content) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <SkipLink />
      <Masthead variant="case-study" />
      <main id="main-content">
        <CaseStudyHero content={content} />
        <CaseStudyCallout content={content.callout} />
        <ImageBlock image={content.heroImage} />
        <CaseStudySection content={content.sections[0]} background="paper" />
        <CaseStudySection content={content.sections[1]} background="surface" />
        <ImagePair images={content.imagePair} />
        <CaseStudySection content={content.sections[2]} background="paper" />
      </main>
      <CaseStudyFooterNav currentSlug={content.slug} nextProjectSlug={content.nextProjectSlug} />
    </>
  );
}
