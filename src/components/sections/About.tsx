import { SectionHeading, Button, ImagePlaceholder } from '../ui';
import { PageContainer } from '../layout';
import { SITE, CAPABILITIES } from '../../data/site';
import styles from './About.module.css';

/** Short bio + a 2x2 (desktop) grid of capabilities, alongside a portrait
 * placeholder. */
export function About() {
  return (
    <section className={styles.about} aria-labelledby="about-heading">
      <PageContainer className={styles.grid}>
        <div className={styles.intro}>
          <SectionHeading
            eyebrow="About"
            headingId="about-heading"
            heading={
              <>
                {SITE.aboutHeadingLead}
                <br />
                <em className={styles.emphasis}>{SITE.aboutHeadingEmphasis}</em>
              </>
            }
          />
          <Button href="/home#selected-work" variant="text">
            View selected work →
          </Button>
        </div>

        <ImagePlaceholder
          className={styles.photo}
          aspectRatio="3 / 4"
          image={{ alt: 'Portrait of Cait Burke' }}
        />

        <ul className={styles.capabilities}>
          {CAPABILITIES.map((capability) => (
            <li key={capability.title} className={styles.capability}>
              <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              <p className={styles.capabilityDescription}>{capability.description}</p>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
