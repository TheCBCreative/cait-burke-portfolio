import { Button, EdgeTab, Emphasis, EntranceLines, Eyebrow, entrance, entranceStep as step } from '../components/ui';
import { FernBackground } from '../components/media';
import { useDarkPageBackground } from '../hooks/useDarkPageBackground';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { CREDENTIALS, SITE } from '../data/site';
import { cx } from '../utils/cx';
import surfaces from '../styles/surfaces.module.css';
import styles from './LandingPage.module.css';

const tagline = SITE.landingTagline;

/** The full-screen splash that leads into /home. */
export function LandingPage() {
  useDocumentTitle(`${SITE.name} — Portfolio`);
  useDarkPageBackground();

  return (
    <main className={cx(styles.page, surfaces.ink)}>
      <FernBackground />
      <div className={styles.scrim} aria-hidden="true" />
      <EdgeTab label="Portfolio" tone="on-dark" />

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={cx(styles.role, entrance.enter)} style={step(0)}>
            <Eyebrow tone="on-dark">{SITE.roleTagline}</Eyebrow>
          </span>
          <p className={cx(styles.status, entrance.enter)} style={step(1)}>
            <span className={styles.dot} aria-hidden="true" />
            {SITE.availability}
            <span className={styles.location}> · {SITE.location}</span>
          </p>
        </div>

        <div className={styles.main}>
          <span className={cx(styles.mobileRole, entrance.enter)} style={step(1)}>
            <Eyebrow tone="on-dark">{SITE.roleTagline}</Eyebrow>
          </span>
          <h1 className={styles.name}>
            <EntranceLines lines={[SITE.name]} firstStep={2} />
          </h1>
          <p className={styles.tagline}>
            <EntranceLines lines={[tagline.lead, <Emphasis key="emphasis">{tagline.emphasis}</Emphasis>]} firstStep={3} />
          </p>
          <span className={entrance.enter} style={step(5)}>
            <Button href="/home" variant="outline" tone="on-dark" arrow="right" className={styles.cta}>
              Check it out
            </Button>
          </span>
        </div>

        <dl className={cx(styles.credentials, entrance.enter)} style={step(6)}>
          {CREDENTIALS.map((item) => (
            <div key={item.label} className={styles.credential}>
              <dt className={styles.credentialLabel}>{item.label}</dt>
              <dd className={styles.credentialValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
