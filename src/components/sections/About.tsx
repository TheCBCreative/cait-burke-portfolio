import { SectionHeading, Button, Reveal } from '../ui';
import { FernClip } from '../media';
import { PageContainer } from '../layout';
import { useReveal } from '../../hooks/useReveal';
import { SITE, CAPABILITIES } from '../../data/site';
import { cx } from '../../utils/cx';
import styles from './About.module.css';

export function About() {
  // One trigger, at the top of the content, reveals the whole section in sequence.
  const { ref: introRef, isRevealed } = useReveal<HTMLDivElement>();

  return (
    <section className={styles.about} aria-labelledby="about-heading">
      <PageContainer className={styles.grid}>
        <div ref={introRef} className={styles.intro}>
          <SectionHeading
            eyebrow="About"
            headingId="about-heading"
            tone="on-dark"
            revealed={isRevealed}
            heading={
              <>
                {SITE.aboutHeadingLead}
                <br />
                <em className={styles.emphasis}>{SITE.aboutHeadingEmphasis}</em>
              </>
            }
          />
          <Button href="/home#selected-work" tone="on-dark">
            View selected work →
          </Button>
        </div>

        {/* Not wrapped in <Reveal>: on desktop the clip bleeds into the section padding as a grid item. */}
        <FernClip
          variant="mobile"
          className={cx(styles.clip, isRevealed && styles.clipRevealed)}
        />

        <ul className={styles.capabilities}>
          {CAPABILITIES.map((capability, index) => (
            <Reveal
              as="li"
              variant="fade"
              delay={400 + index * 180}
              revealed={isRevealed}
              key={capability.title}
              className={styles.capability}
            >
              <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              <p className={styles.capabilityDescription}>{capability.description}</p>
            </Reveal>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
