import { Eyebrow, Divider, TagList, Button, EdgeTab } from '../components/ui';
import { LandingBackground } from '../components/landing';
import { SITE } from '../data/site';
import styles from './LandingPage.module.css';

/**
 * The full-bleed splash screen visitors land on first. Its only job is to
 * set tone and send people on to the full homepage via the CTA — so it
 * has no masthead/footer of its own.
 */
export function LandingPage() {
  return (
    <main className={styles.page}>
      <LandingBackground />
      <div className={styles.scrim} aria-hidden="true" />
      <EdgeTab label={SITE.name} tone="on-dark" />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <Eyebrow tone="on-dark">{SITE.roleTagline}</Eyebrow>
          <div className={styles.locationGroup}>
            <span className={styles.location}>{SITE.location}</span>
            <div className={styles.availability}>
              <span className={styles.dot} aria-hidden="true" />
              <Eyebrow tone="on-dark">{SITE.availability}</Eyebrow>
            </div>
          </div>
        </div>

        <div className={styles.main}>
          <Eyebrow tone="on-dark">Portfolio</Eyebrow>
          <h1 className={styles.name}>{SITE.name}</h1>
          <p className={styles.tagline}>{SITE.landingTagline}</p>
          <Button href="/home" variant="text" tone="on-dark" className={styles.cta}>
            Check it out →
          </Button>
        </div>

        <div className={styles.bottomRow}>
          <Divider tone="dark" />
          <TagList
            tags={['Design', 'Development', 'Accessibility-minded']}
            tone="on-dark"
          />
        </div>
      </div>
    </main>
  );
}
