import type { ReactNode } from 'react';
import { Eyebrow, Divider, TagList, Reveal, ExternalLink } from '../ui';
import { SITE, SOCIAL_LINKS } from '../../data/site';
import { PageContainer } from './PageContainer';
import styles from './ContactFooter.module.css';

interface ContactFooterProps {
  /** The "Currently open to…" pitch; off on case studies. */
  showHeading?: boolean;
}

/** GitHub's own mark, and a plain envelope for email — icon-only so the
 * secondary link row reads as a compact utility row under the primary
 * LinkedIn CTA rather than repeating another line of text. Each link's
 * accessible name comes from `aria-label`/`ExternalLink`'s `ariaLabel`,
 * not visible text, since the icon alone isn't enough for screen readers. */
const SOCIAL_ICONS: Record<string, ReactNode> = {
  GitHub: (
    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
           0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
           -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
           .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
           -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
           .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
           .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
           0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  ),
  Email: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
};

export function ContactFooter({ showHeading = true }: ContactFooterProps) {
  const [primaryLink, ...otherLinks] = SOCIAL_LINKS;

  return (
    <footer className={styles.footer}>
      <PageContainer className={styles.inner}>
        <Reveal className={styles.top}>
          <Eyebrow tone="on-dark">Get in touch</Eyebrow>
          {showHeading && <h2 className={styles.heading}>{SITE.contactHeading}</h2>}
          <ExternalLink href={primaryLink.href} className={styles.primaryLink}>
            {primaryLink.label} →
          </ExternalLink>
          <ul className={styles.secondaryLinks}>
            {otherLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('http') ? (
                  <ExternalLink href={link.href} className={styles.secondaryLink} ariaLabel={link.label}>
                    {SOCIAL_ICONS[link.label]}
                  </ExternalLink>
                ) : (
                  <a href={link.href} className={styles.secondaryLink} aria-label={link.label}>
                    {SOCIAL_ICONS[link.label]}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Divider tone="dark" />

        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} {SITE.name}</p>
          <TagList tags={SITE.footerTagline.split(' · ')} tone="on-dark" />
        </div>
      </PageContainer>
    </footer>
  );
}
