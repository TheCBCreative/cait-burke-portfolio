import { Eyebrow, Button, MetaList } from '../ui';
import { PageContainer } from '../layout';
import { SITE, SOCIAL_LINKS } from '../../data/site';
import styles from './Hero.module.css';

const emailLink = SOCIAL_LINKS.find((link) => link.label === 'Email');

/** The homepage's introductory section: name, bio, primary CTAs, and a
 * short "specimen" of stack/location/status. */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <PageContainer className={styles.grid}>
        <div className={styles.copy}>
          <Eyebrow>{SITE.roleTagline}</Eyebrow>
          <h1 id="hero-heading" className={styles.name}>
            {SITE.name}
          </h1>
          <p className={styles.lede}>{SITE.heroLede}</p>
          <p className={styles.bio}>{SITE.heroBio}</p>
          <div className={styles.ctaRow}>
            <Button href="/home#selected-work" variant="text">
              View the work →
            </Button>
            <Button href={emailLink?.href} variant="text">
              Say hello
            </Button>
          </div>
        </div>

        <MetaList
          className={styles.specimen}
          items={[
            { label: 'Stack', value: SITE.stackSummary },
            { label: 'Based', value: SITE.location },
            { label: 'Status', value: SITE.status },
          ]}
        />
      </PageContainer>
    </section>
  );
}
