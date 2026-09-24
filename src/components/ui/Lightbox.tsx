import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ImageSlot } from '../../data/types';
import styles from './Lightbox.module.css';

interface LightboxProps {
  image: ImageSlot;
  onClose: () => void;
}

/** Full-screen overlay showing one case study image at a larger size.
 * Closes on Escape, a backdrop click, or the close button, and locks
 * page scroll while open. Portaled to `document.body` so it always
 * covers the full viewport regardless of where it's triggered from. */
export function Lightbox({ image, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <button
        ref={closeButtonRef}
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close enlarged image"
      >
        ×
      </button>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
        onClick={(event) => event.stopPropagation()}
      >
        {image.src && <img src={image.src} alt={image.alt} className={styles.image} />}
        {image.caption && <p className={styles.caption}>{image.caption}</p>}
      </div>
    </div>,
    document.body
  );
}
