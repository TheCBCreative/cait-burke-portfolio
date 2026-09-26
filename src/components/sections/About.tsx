import { useRef } from 'react';
import { Reveal, SectionHeading } from '../ui';
import { useScrollLinked } from '../../hooks/useScrollLinked';
import { PageContainer } from '../layout';
import { CAPABILITIES, SITE } from '../../data/site';
import { cx } from '../../utils/cx';
import scrollLinked from '../../styles/scrollLinked.module.css';
import surfaces from '../../styles/surfaces.module.css';
import styles from './About.module.css';

export function About() {
  const portraitRef = useRef<HTMLImageElement>(null);
  useScrollLinked(portraitRef, 'settle');

  return (
    <section className={cx(styles.about, surfaces.ink)} aria-labelledby="about-heading">
      <PageContainer className={styles.inner}>
        <SectionHeading eyebrow="About" headingId="about-heading" heading={SITE.aboutHeading} tone="on-dark" size="xl" />

        <div className={styles.body}>
          <Reveal variant="wipe" className={styles.portrait}>
            <div className={styles.portraitFrame}>
              <img
                ref={portraitRef}
                src={SITE.portrait.src}
                alt={SITE.portrait.alt}
                loading="lazy"
                decoding="async"
                className={cx(styles.portraitImage, scrollLinked.settle)}
              />
            </div>
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
