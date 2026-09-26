import { useEffect } from 'react';
import { formatContrast } from '../../utils/contrast';
import { Pin } from './Pin';
import styles from './BrandBoard.module.css';

const BRAND_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=Geist+Mono&family=Geist:wght@300;400;500;600&family=Playfair+Display:wght@600&display=swap';

/** The CB Creative's core tokens, from common/styles/brand.css. */
const BRAND = { paper: '#F6F3EC', ink: '#1C1F16', forest: '#2F3A1F', sage: '#93A876' };

const SWATCHES = [
  { name: 'Paper', hex: BRAND.paper, text: BRAND.ink, pairing: 'Ink on paper' },
  { name: 'Ink', hex: BRAND.ink, text: BRAND.paper, pairing: 'Paper on ink' },
  { name: 'Forest', hex: BRAND.forest, text: BRAND.paper, pairing: 'Paper on forest' },
  { name: 'Sage', hex: BRAND.sage, text: BRAND.ink, pairing: 'Ink on sage' },
];

const TYPE_ROLES = [
  { family: 'Playfair Display', role: 'Headlines' },
  { family: 'Cormorant Garamond Italic', role: 'Accents' },
  { family: 'Geist', role: 'Body & UI' },
];

const TOKENS = [
  ['--color-paper', BRAND.paper],
  ['--color-ink', BRAND.ink],
  ['--color-forest', BRAND.forest],
  ['--color-sage', BRAND.sage],
  ['--font-serif', 'Playfair Display'],
  ['--font-sans', 'Geist'],
  ['--space-xl', '3rem'],
  ['--ease-reveal', 'cubic-bezier(…)'],
];

/** Loads the studio's own typefaces, only on the page that shows them. */
function useBrandFonts() {
  useEffect(() => {
    if (document.querySelector(`link[href="${BRAND_FONTS_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BRAND_FONTS_HREF;
    document.head.append(link);
  }, []);
}

/** The CB Creative's brand system, rebuilt live from its tokens. Pins match the design decisions. */
export function BrandBoard() {
  useBrandFonts();

  return (
    <figure className={styles.board} aria-label="The CB Creative brand system: logo, typefaces, palette and tokens">
      <div className={styles.row}>
        <div className={styles.logo}>
          <img src="/images/the-cb-creative/logo-mark-on-dark.svg" alt="The CB Creative monogram" width="96" height="96" />
          <p className={styles.wordmark}>
            <span className={styles.wordmarkThe}>The</span>
            CB Creative
          </p>
        </div>
        <div className={styles.type}>
          <p className={styles.specimens} aria-hidden="true">
            <span className={styles.serif}>Aa</span>
            <span className={styles.accent}>Aa</span>
          </p>
          <dl className={styles.roles}>
            {TYPE_ROLES.map((item) => (
              <div key={item.family} className={styles.roleRow}>
                <dt>{item.family}</dt>
                <dd>{item.role}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <ul className={styles.palette}>
        {SWATCHES.map((swatch) => (
          <li key={swatch.name} className={styles.swatch} style={{ backgroundColor: swatch.hex, color: swatch.text }}>
            <span className={styles.swatchName}>{swatch.name}</span>
            <span className={styles.hex}>{swatch.hex}</span>
            <span className={styles.pairing}>{swatch.pairing}</span>
            <span className={styles.ratio}>{formatContrast(swatch.text, swatch.hex)}</span>
            {swatch.name === 'Forest' && <Pin number={1} style={{ left: 'calc(100% - 1.5rem)', top: '1.5rem' }} />}
          </li>
        ))}
      </ul>

      <div className={styles.row}>
        <div className={styles.inUse}>
          <div className={styles.inUseCopy}>
            <span className={styles.inUseLabel}>Homepage hero</span>
            <span className={styles.inUseHeading}>Your website is your first impression.</span>
            <span className={styles.inUseAccent}>
              Let’s make it a good one. <Pin number={2} />
            </span>
          </div>
          <span className={styles.buttons} aria-hidden="true">
            <span className={styles.primary}>Start a project</span>
            <span className={styles.ghost}>See the work</span>
          </span>
        </div>
        <div className={styles.tokens}>
          <Pin number={3} style={{ left: 'calc(100% - 1.5rem)', top: '1.5rem' }} />
          <p className={styles.file}>common/styles/brand.css</p>
          <dl className={styles.code}>
            {TOKENS.map(([name, value]) => (
              <div key={name} className={styles.token}>
                <dt>{name}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </figure>
  );
}
