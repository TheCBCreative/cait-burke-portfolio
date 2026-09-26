import { Reveal } from '../ui';
import type { Decision, DesignFigure } from '../../data/types';
import { AnnotatedScreenshot } from './AnnotatedScreenshot';
import { BrandBoard } from './BrandBoard';
import { Pin } from './Pin';
import styles from './DesignDecisions.module.css';

interface DesignDecisionsProps {
  figure: DesignFigure;
  decisions: Decision[];
}

/** A figure with numbered pins beside the decisions they point to. */
export function DesignDecisions({ figure, decisions }: DesignDecisionsProps) {
  return (
    <div className={styles.layout}>
      <Reveal variant="fade" className={styles.figure}>
        {figure.kind === 'screenshot' ? <AnnotatedScreenshot image={figure.image} pins={figure.pins} /> : <BrandBoard />}
      </Reveal>
      <ol className={styles.decisions}>
        {decisions.map((decision, index) => (
          <Reveal as="li" variant="fade" delay={150 + index * 120} key={decision.title} className={styles.decision}>
            <Pin number={index + 1} />
            <div className={styles.copy}>
              <h3 className={styles.title}>{decision.title}</h3>
              <p className={styles.body}>{decision.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
