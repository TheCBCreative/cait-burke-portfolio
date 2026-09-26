import {
  Eyebrow,
  Divider,
  TagList,
  Button,
  EdgeTab,
  EntranceLines,
  entrance,
  entranceStep as step,
} from '../components/ui';
import { LandingBackground } from '../components/landing';
import { useDarkPageBackground } from '../hooks/useDarkPageBackground';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE } from '../data/site';
import { cx } from '../utils/cx';
import styles from './LandingPage.module.css';

const nameLines = SITE.name.split(' ');
// "One. Two." → ["One.", "Two."]
const taglineLines = SITE.landingTagline.split(/(?<=\.)\s+/);
const afterText = 5 + nameLines.length + taglineLines.length;

/** The full-screen splash that leads into /home. */
export function LandingPage() {
  useDocumentTitle(`${SITE.name} — Portfolio`);

  useDarkPageBackground();

  return (
    <main className={styles.page}>
      <LandingBackground />
      <div className={styles.scrim} aria-hidden="true" />
      <EdgeTab label="Portfolio" tone="on-dark" />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={entrance.enter} style={step(0)}>
            <Eyebrow tone="on-dark">{SITE.roleTagline}</Eyebrow>
          </span>
          <div className={styles.status}>
            <span className={cx(styles.statusText, entrance.enter)} style={step(1)}>
              {SITE.location}
            </span>
            <span className={cx(styles.badge, entrance.enter)} style={step(2)} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0Z" />
              </svg>
            </span>
            <span className={cx(styles.statusText, styles.availability, entrance.enter)} style={step(3)}>
              {SITE.availability}
            </span>
          </div>
        </div>

        <div className={styles.main}>
          <span className={entrance.enter} style={step(4)}>
            <Eyebrow tone="on-dark">Portfolio</Eyebrow>
          </span>
          <h1 className={styles.name}>
            <EntranceLines lines={nameLines} firstStep={5} />
          </h1>
          <p className={styles.tagline}>
            <EntranceLines lines={taglineLines} firstStep={5 + nameLines.length} />
          </p>
          <span className={entrance.enter} style={step(afterText)}>
            <Button href="/home" variant="outline" tone="on-dark" className={styles.cta}>
              Check it out →
            </Button>
          </span>
        </div>

        <div className={styles.bottomRow}>
          <div className={entrance.enter} style={step(afterText + 1)}>
            <Divider tone="dark" />
          </div>
          <div className={entrance.enter} style={step(afterText + 2)}>
            <TagList tags={['Design', 'Development', 'Accessibility-minded']} tone="on-dark" />
          </div>
        </div>
      </div>
    </main>
  );
}
