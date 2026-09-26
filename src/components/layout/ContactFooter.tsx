import { Button, Eyebrow, Reveal, TwoTone } from '../ui';
import { SITE, SOCIAL_LINKS } from '../../data/site';
import { cx } from '../../utils/cx';
import surfaces from '../../styles/surfaces.module.css';
import { PageContainer } from './PageContainer';
import styles from './ContactFooter.module.css';

interface ContactFooterProps {
  /** `statement` opens with the availability headline (home); `compact` is for case studies. */
  variant?: 'statement' | 'compact';
}

export function ContactFooter({ variant = 'statement' }: ContactFooterProps) {
  const isStatement = variant === 'statement';

  return (
    <footer className={cx(styles.footer, styles[variant], surfaces.ink)}>
      <PageContainer className={styles.inner}>
        <Reveal className={styles.main}>
          <Eyebrow tone="on-dark">Get in touch</Eyebrow>
          {isStatement && (
            <h2 className={styles.heading}>
              <TwoTone heading={SITE.contactHeading} />
            </h2>
          )}
          <a href={`mailto:${SITE.email}`} className={styles.email}>
            {SITE.email}
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </a>
          <ul className={styles.links}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <Button href={link.href} tone="on-dark" arrow="external">
                  {link.label}
                </Button>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p>{SITE.footerTagline}</p>
        </div>
      </PageContainer>
    </footer>
  );
}
