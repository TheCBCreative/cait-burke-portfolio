import { ContactFooter, SkipLink } from '../components/layout';
import { Hero, About, SelectedWork } from '../components/sections';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE } from '../data/site';

/** The main site page: intro, bio, project grid, and contact. There's no
 * separate masthead here — with only the one real page, the hero's own
 * edge tab already does that job (name + brand mark, top of page down). */
export function HomePage() {
  useDocumentTitle(`${SITE.name} — ${SITE.roleTagline}`);

  return (
    <>
      <SkipLink />
      <main id="main-content">
        <Hero />
        <About />
        <SelectedWork />
      </main>
      <ContactFooter />
    </>
  );
}
