import { Eyebrow, Divider, TagList } from '../ui';
import { SITE, SOCIAL_LINKS } from '../../data/site';
import { PageContainer } from './PageContainer';
import styles from './ContactFooter.module.css';

/** The dark "Get in touch" block that closes the homepage: contact links
 * up top, copyright and site tagline in a slim bar underneath. This is
 * the only footer the homepage has — case study pages use their own,
 * simpler <CaseStudyFooterNav> instead. */
export function ContactFooter() {
  const [linkedin, ...otherLinks] = SOCIAL_LINKS;

  return (
    <footer className={styles.footer}>
      <PageContainer className={styles.inner}>
        <div className={styles.top}>
          <Eyebrow tone="on-dark">Get in touch</Eyebrow>
          <h2 className={styles.heading}>{SITE.contactHeading}</h2>
          <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>
            {linkedin.label} →
          </a>
          <ul className={styles.secondaryLinks}>
            {otherLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Divider tone="dark" />

        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Cait Burke</p>
          <TagList tags={SITE.footerTagline.split(' · ')} tone="on-dark" />
        </div>
      </PageContainer>
    </footer>
  );
}
