import { useEffect } from 'react';
import { formatContrast } from '../../utils/contrast';
import { Pin } from './Pin';
import styles from './BrandBoard.module.css';

// Fraunces is already loaded for the portfolio itself.
const BRAND_FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Aboreto&family=Italiana&family=Work+Sans:wght@400;500&display=swap';

/** The CB Creative's color tokens, from app/styles/tokens.css. */
const BRAND = {
  pine: '#1b2318',
  snow: '#f6f6f1',
  mist: '#e2e3dc',
  brass: '#b08d57',
  brassLight: '#d1bd9e',
  brassDeep: '#85663a',
  rust: '#9b3b2f',
};

/** Each color with the color it's paired with on the site. */
const SWATCHES = [
  { name: 'Pine', hex: BRAND.pine, text: BRAND.snow, pairing: 'with Snow' },
  { name: 'Snow', hex: BRAND.snow, text: BRAND.pine, pairing: 'with Pine' },
  { name: 'Mist', hex: BRAND.mist, text: BRAND.pine, pairing: 'with Pine' },
  { name: 'Brass', hex: BRAND.brass, text: BRAND.pine, pairing: 'with Pine · CTA' },
  { name: 'Brass Light', hex: BRAND.brassLight, text: BRAND.pine, pairing: 'with Pine' },
  { name: 'Brass Deep', hex: BRAND.brassDeep, text: BRAND.snow, pairing: 'with Snow' },
  { name: 'Rust', hex: BRAND.rust, text: BRAND.snow, pairing: 'with Snow · errors' },
];

const TYPE_ROLES = [
  { family: 'Italiana', role: 'Display' },
  { family: 'Aboreto', role: 'Eyebrows & nav' },
  { family: 'Fraunces Italic', role: 'Accents' },
  { family: 'Work Sans', role: 'Body & UI' },
];

const TOKENS = [
  ['--color-pine', BRAND.pine],
  ['--color-snow', BRAND.snow],
  ['--color-brass', BRAND.brass],
  ['--color-brass-deep', BRAND.brassDeep],
  ['--font-display', 'Italiana'],
  ['--font-body', 'Work Sans'],
  ['--opacity-muted-text', '70%'],
  ['--breakpoint-lg', '1200px'],
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
          <img src="/images/the-cb-creative/logo-mark.svg" alt="The CB Creative monogram" width="96" height="96" />
          <p className={styles.wordmark}>The CB Creative</p>
        </div>
        <div className={styles.type}>
          <Pin number={2} style={{ left: 'calc(100% - 1.5rem)', top: '1.5rem' }} />
          <p className={styles.specimens} aria-hidden="true">
            <span className={styles.display}>Aa</span>
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

      <div className={styles.paletteWrap}>
        <Pin number={1} style={{ left: 'calc(100% - 1.5rem)', top: '0' }} />
        <ul className={styles.palette}>
          {SWATCHES.map((swatch) => (
            <li key={swatch.name} className={styles.swatch} style={{ backgroundColor: swatch.hex, color: swatch.text }}>
              <span className={styles.swatchName}>{swatch.name}</span>
              <span className={styles.hex}>{swatch.hex}</span>
              <span className={styles.pairing}>{swatch.pairing}</span>
              <span className={styles.ratio}>{formatContrast(swatch.text, swatch.hex)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.row}>
        <div className={styles.inUse}>
          <div className={styles.inUseCopy}>
            <span className={styles.inUseLabel}>Homepage hero</span>
            <span className={styles.inUseHeading}>Your website is your first impression.</span>
            <span className={styles.inUseLine}>
              Let’s make it a <span className={styles.inUseAccent}>good one.</span>
            </span>
          </div>
          <span className={styles.buttons} aria-hidden="true">
            <span className={styles.primary}>Start a project</span>
            <span className={styles.ghost}>Let’s talk</span>
          </span>
        </div>
        <div className={styles.tokens}>
          <Pin number={3} style={{ left: 'calc(100% - 1.5rem)', top: '1.5rem' }} />
          <p className={styles.file}>app/styles/tokens.css</p>
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
