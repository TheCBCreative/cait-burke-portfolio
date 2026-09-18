import { Fragment } from 'react';
import { Eyebrow, Divider, TagList, Button, EdgeTab } from '../components/ui';
import { LandingBackground } from '../components/landing';
import { SITE } from '../data/site';
import styles from './LandingPage.module.css';

// Split "Sentence one. Sentence two." into its sentences, so each can sit
// on its own line without hardcoding the break inside the data string.
const taglineLines = SITE.landingTagline.split('. ').map((line, index, lines) =>
  index < lines.length - 1 ? `${line}.` : line,
);

const nameWords = SITE.name.split(' ');

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
      <EdgeTab label="Portfolio" tone="on-dark" />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <Eyebrow tone="on-dark">{SITE.roleTagline}</Eyebrow>
          <div className={styles.locationGroup}>
            <span className={styles.location}>{SITE.location}</span>
            <div className={styles.availability}>
              <span className={styles.badgeCircle} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0Z" />
                </svg>
              </span>
              <span className={styles.badgeLabel}>{SITE.availability}</span>
            </div>
          </div>
        </div>

        <div className={styles.main}>
          <Eyebrow tone="on-dark">Portfolio</Eyebrow>
          <h1 className={styles.name}>
            {nameWords.map((word, index) => (
              <Fragment key={word}>
                {word}
                {index < nameWords.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </h1>
          <p className={styles.tagline}>
            {taglineLines.map((line, index) => (
              <Fragment key={line}>
                {line}
                {index < taglineLines.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
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
