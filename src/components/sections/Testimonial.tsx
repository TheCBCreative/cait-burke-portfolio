import { Eyebrow, Reveal } from '../ui';
import { PageContainer } from '../layout';
import { TESTIMONIALS } from '../../data/testimonials';
import styles from './Testimonial.module.css';

/** The first testimonial, as a left-aligned pull quote. */
export function Testimonial() {
  const [testimonial] = TESTIMONIALS;
  if (!testimonial) return null;

  return (
    <section className={styles.testimonial} aria-labelledby="testimonial-heading">
      <PageContainer className={styles.inner}>
        <span className={styles.mark} aria-hidden="true">
          &ldquo;
        </span>
        <figure className={styles.figure}>
          <Reveal variant="fade">
            <h2 id="testimonial-heading">
              <Eyebrow tone="accent">From a former manager</Eyebrow>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <blockquote className={styles.quote}>
              <p>{testimonial.quote}</p>
            </blockquote>
          </Reveal>
          <Reveal variant="fade" delay={400}>
            <figcaption className={styles.attribution}>
              <span className={styles.name}>{testimonial.name}</span>
              <span className={styles.role}>{testimonial.role}</span>
              <span className={styles.source}>
                {testimonial.source} · {testimonial.date}
              </span>
            </figcaption>
          </Reveal>
        </figure>
      </PageContainer>
    </section>
  );
}
