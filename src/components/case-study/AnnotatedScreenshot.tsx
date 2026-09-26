import { ImageFrame } from '../ui';
import type { ImageSlot, Pin as PinPosition } from '../../data/types';
import { Pin } from './Pin';
import styles from './AnnotatedScreenshot.module.css';

interface AnnotatedScreenshotProps {
  image: ImageSlot;
  pins: PinPosition[];
}

export function AnnotatedScreenshot({ image, pins }: AnnotatedScreenshotProps) {
  return (
    <div className={styles.figure}>
      <ImageFrame image={image} aspectRatio="720 / 460" enlargeable />
      {pins.map((pin, index) => (
        <Pin key={index} number={index + 1} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} />
      ))}
    </div>
  );
}
