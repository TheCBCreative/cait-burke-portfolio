import { ImageFrame } from '../ui';
import type { ImageSlot, Pin as PinPosition } from '../../data/types';
import { Pin } from './Pin';
import styles from './AnnotatedScreenshot.module.css';

/** The figure column in DesignDecisions.module.css, inside the page's side padding. */
const SIZES = '(min-width: 1100px) 45rem, (min-width: 700px) calc(100vw - 5rem), calc(100vw - 3rem)';

interface AnnotatedScreenshotProps {
  image: ImageSlot;
  /** The screenshot's own ratio, e.g. "1636 / 1500", so pin percentages land where they were placed. */
  aspectRatio: string;
  pins: PinPosition[];
}

export function AnnotatedScreenshot({ image, aspectRatio, pins }: AnnotatedScreenshotProps) {
  return (
    <div className={styles.figure}>
      <ImageFrame image={image} aspectRatio={aspectRatio} sizes={SIZES} enlargeable />
      {pins.map((pin, index) => (
        <Pin key={index} number={index + 1} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} />
      ))}
    </div>
  );
}
