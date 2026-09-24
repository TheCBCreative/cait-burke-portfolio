import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ImageSlot } from '../../data/types';
import styles from './Lightbox.module.css';

interface LightboxProps {
  image: ImageSlot;
  onClose: () => void;
}

/** Full-screen view of one image. A native modal <dialog>, so focus
 * trapping, Escape, and focus return are handled by the browser. */
export function Lightbox({ image, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const close = () => dialogRef.current?.close();

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={image.alt}
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <button type="button" className={styles.close} onClick={close} aria-label="Close enlarged image" autoFocus>
        ×
      </button>
      <figure className={styles.content}>
        <img src={image.src} alt={image.alt} className={styles.image} />
        {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
      </figure>
    </dialog>,
    document.body,
  );
}
