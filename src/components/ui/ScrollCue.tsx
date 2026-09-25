import { useEffect, useRef, useState } from 'react';
import { cx } from '../../utils/cx';
import { entrance, entranceStep } from './entrance';
import styles from './ScrollCue.module.css';

interface ScrollCueProps {
  /** Where the cue falls in the hero's entrance sequence; it should come last. */
  step: number;
}

/**
 * Decorative bouncing chevron pinned to the bottom of the screen while the page
 * is at the top. Fades out once the visitor scrolls. Its glow turns dark when
 * it sits over a dark section, so it reads on any page.
 */
export function ScrollCue({ step }: ScrollCueProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [tone, setTone] = useState<Tone>('light');

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 40);
    const detectTone = () => {
      if (ref.current) setTone(toneUnder(ref.current, (img) => img.addEventListener('load', detectTone, { once: true })));
    };

    onScroll();
    detectTone();
    // Fonts and images can shift the layout just after mount.
    const timer = window.setTimeout(detectTone, 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', detectTone);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', detectTone);
    };
  }, []);

  // Three layers so the fade-out, the entrance, and the bounce don't fight over `animation`.
  return (
    <div
      ref={ref}
      className={cx(styles.cue, styles[tone], hasScrolled && styles.hidden)}
      aria-hidden="true"
    >
      <span className={entrance.enter} style={entranceStep(step)}>
        <span className={styles.glow}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </span>
    </div>
  );
}

type Tone = 'light' | 'dark';

/**
 * Works out whether the cue sits over something light or dark. The cue has
 * `pointer-events: none`, so hit-testing looks straight through it. Takes the
 * first opaque background at that point, skipping anything not yet revealed,
 * and reads the pixels of images, which have no background color of their own.
 * `onPending` is called when an image under the cue hasn't loaded yet.
 */
function toneUnder(cue: HTMLElement, onPending: (img: HTMLImageElement) => void): Tone {
  const box = cue.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;

  // Images first, by geometry. A case study image under the cue is still
  // clipped by its wipe-in reveal for the first second, and clipped areas don't
  // hit-test, so the stack below would see the white section behind it.
  const image = Array.from(document.images)
    .filter((img) => {
      const r = img.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom && !isHidden(img);
    })
    .pop();
  if (image) {
    if (!image.complete) {
      onPending(image);
    } else {
      const tone = imageTone(image, x, y);
      if (tone) return tone;
    }
  }

  // Otherwise every element stacked at that point, topmost first.
  for (const node of document.elementsFromPoint(x, y)) {
    if (node === document.documentElement || isHidden(node)) continue;
    const tone = colorTone(getComputedStyle(node).backgroundColor);
    if (tone) return tone;
  }
  return 'light';
}

/** True while an element, or any ancestor, is fully transparent (e.g. not yet revealed). */
function isHidden(el: Element): boolean {
  for (let node: Element | null = el; node; node = node.parentElement) {
    if (Number(getComputedStyle(node).opacity) < 0.05) return true;
  }
  return false;
}

function colorTone(color: string): Tone | undefined {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return undefined;
  const [r, g, b, a = 1] = match[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  if (a <= 0.5) return undefined;
  return luminanceTone(r, g, b);
}

/** Averages a small patch of the image around the cue's center. */
function imageTone(img: HTMLImageElement, x: number, y: number): Tone | undefined {
  try {
    const rect = img.getBoundingClientRect();
    // Map the point into the image's own pixels, allowing for object-fit: cover
    // (centered), which crops the image to fill its box.
    const cover = getComputedStyle(img).objectFit === 'cover';
    const scaleX = cover ? Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight) : rect.width / img.naturalWidth;
    const scaleY = cover ? scaleX : rect.height / img.naturalHeight;
    const offsetX = (rect.width - img.naturalWidth * scaleX) / 2;
    const offsetY = (rect.height - img.naturalHeight * scaleY) / 2;
    const sx = (x - rect.left - offsetX) / scaleX;
    const sy = (y - rect.top - offsetY) / scaleY;
    const size = Math.max(1, Math.round(img.naturalWidth * 0.04));
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 8;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return undefined;
    ctx.drawImage(img, sx - size / 2, sy - size / 2, size, size, 0, 0, 8, 8);
    const data = ctx.getImageData(0, 0, 8, 8).data;
    let r = 0;
    let g = 0;
    let b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    const count = data.length / 4;
    return luminanceTone(r / count, g / count, b / count);
  } catch {
    // Cross-origin images can't be read; fall back to the background behind them.
    return undefined;
  }
}

function luminanceTone(r: number, g: number, b: number): Tone {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5 ? 'dark' : 'light';
}
