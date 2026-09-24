import { Eyebrow, Reveal } from '../ui';
import { PageContainer } from '../layout';
import { useReveal } from '../../hooks/useReveal';
import { TESTIMONIALS } from '../../data/testimonials';
import styles from './Testimonial.module.css';

/** The first testimonial, as a centered pull quote. */
export function Testimonial() {
  const [testimonial] = TESTIMONIALS;
  // One trigger, at the top of the content, reveals the whole section in sequence.
  const { ref: triggerRef, isRevealed } = useReveal<HTMLDivElement>();
  if (!testimonial) return null;

  return (
    <section className={styles.testimonial} aria-label="What clients say">
      <PageContainer className={styles.inner}>
        <div ref={triggerRef}>
          <Reveal variant="fade" revealed={isRevealed}>
            <Eyebrow>What clients say</Eyebrow>
          </Reveal>
        </div>
        <figure className={styles.figure}>
          <Reveal delay={200} revealed={isRevealed}>
            <blockquote className={styles.quote}>
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
            </blockquote>
          </Reveal>
          <figcaption className={styles.attribution}>
            <Reveal variant="fade" delay={600} revealed={isRevealed}>
              <span className={styles.name}>{testimonial.name}</span>
            </Reveal>
            <Reveal variant="fade" delay={780} revealed={isRevealed}>
              <span className={styles.role}>{testimonial.role}</span>
            </Reveal>
            <Reveal variant="fade" delay={960} revealed={isRevealed}>
              <span className={styles.source}>
                {testimonial.source} · {testimonial.date}
              </span>
            </Reveal>
          </figcaption>
        </figure>
      </PageContainer>
    </section>
  );
}
