import { ImageFrame } from '../ui';
import type { ImageSlot, Pin as PinPosition } from '../../data/types';
import { Pin } from './Pin';
import styles from './AnnotatedScreenshot.module.css';

interface AnnotatedScreenshotProps {
  image: ImageSlot;
  /** The screenshot's own ratio, e.g. "1636 / 1500", so pin percentages land where they were placed. */
  aspectRatio: string;
  pins: PinPosition[];
}

export function AnnotatedScreenshot({ image, aspectRatio, pins }: AnnotatedScreenshotProps) {
  return (
    <div className={styles.figure}>
      <ImageFrame image={image} aspectRatio={aspectRatio} enlargeable />
      {pins.map((pin, index) => (
        <Pin key={index} number={index + 1} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} />
      ))}
    </div>
  );
}
