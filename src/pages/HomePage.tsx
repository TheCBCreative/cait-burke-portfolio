import { Masthead, ContactFooter, SkipLink } from '../components/layout';
import { Hero, About, SelectedWork } from '../components/sections';

/** The main site page: intro, bio, project grid, and contact. */
export function HomePage() {
  return (
    <>
      <SkipLink />
      <Masthead variant="home" />
      <main id="main-content">
        <Hero />
        <About />
        <SelectedWork />
      </main>
      <ContactFooter />
    </>
  );
}
