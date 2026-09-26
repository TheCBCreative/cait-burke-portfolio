import { ImageFrame, Reveal, SectionHeading } from '../ui';
import { PageContainer } from '../layout';
import { CAPABILITIES, SITE } from '../../data/site';
import { cx } from '../../utils/cx';
import surfaces from '../../styles/surfaces.module.css';
import styles from './About.module.css';

export function About() {
  return (
    <section className={cx(styles.about, surfaces.ink)} aria-labelledby="about-heading">
      <PageContainer className={styles.inner}>
        <SectionHeading eyebrow="About" headingId="about-heading" heading={SITE.aboutHeading} tone="on-dark" size="xl" />

        <div className={styles.body}>
          <Reveal variant="wipe" className={styles.portrait}>
            <ImageFrame image={SITE.portrait} aspectRatio="10 / 13" />
          </Reveal>

          <div className={styles.details}>
            <Reveal variant="fade">
              <p className={styles.bio}>{SITE.aboutBio}</p>
            </Reveal>
            <ol className={styles.capabilities}>
              {CAPABILITIES.map((capability, index) => (
                <Reveal as="li" variant="fade" delay={200 + index * 150} key={capability.title} className={styles.capability}>
                  <h3 className={styles.capabilityTitle}>
                    <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                    {capability.title}
                  </h3>
                  <p className={styles.capabilityDescription}>{capability.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
