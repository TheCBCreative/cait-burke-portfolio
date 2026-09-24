import { ContactFooter, SkipLink } from '../components/layout';
import { Hero, About, SelectedWork, Testimonial } from '../components/sections';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE } from '../data/site';

export function HomePage() {
  useDocumentTitle(`${SITE.name} — ${SITE.roleTagline}`);

  return (
    <>
      <SkipLink />
      <main id="main-content">
        <Hero />
        <About />
        <SelectedWork />
        <Testimonial />
      </main>
      <ContactFooter />
    </>
  );
}
