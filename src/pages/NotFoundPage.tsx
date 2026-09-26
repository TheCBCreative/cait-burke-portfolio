import { Button, EdgeTab, EntranceLines, Eyebrow, entrance, entranceStep as step } from '../components/ui';
import { FernBackground } from '../components/media';
import { SkipLink } from '../components/layout';
import { useDarkPageBackground } from '../hooks/useDarkPageBackground';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE } from '../data/site';
import { cx } from '../utils/cx';
import styles from './NotFoundPage.module.css';

/**
 * Shown for any URL the site doesn't know, including unknown case study slugs
 * and bad paths under the Blog Composer demo (its 404 redirects here). Uses the
 * landing page's full-bleed fern background.
 */
export function NotFoundPage() {
  useDocumentTitle(`Page not found — ${SITE.name}`);
  useDarkPageBackground();

  return (
    <>
      <SkipLink />
      <main id="main-content" className={cx(styles.page, entrance.heroPace)}>
        <FernBackground />
        <div className={styles.scrim} aria-hidden="true" />
        <EdgeTab label="Portfolio" tone="on-dark" />

        <div className={styles.content}>
          <div className={cx(styles.panel, entrance.enter)} style={step(0)}>
            <span className={entrance.enter} style={step(0)}>
              <Eyebrow tone="on-dark">404 · Page not found</Eyebrow>
            </span>
            <h1 className={styles.title}>
              <EntranceLines lines={["This page doesn't exist."]} firstStep={1} />
            </h1>
            <p className={cx(styles.summary, entrance.enter)} style={step(2)}>
              The link may be out of date, or the address may have a typo. Everything I've built is on the home
              page.
            </p>
            <div className={cx(styles.actions, entrance.enter)} style={step(3)}>
              <Button href="/home#selected-work" variant="outline" tone="on-dark">
                View selected work →
              </Button>
              <Button href="/home" tone="on-dark">
                Go to the home page
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
