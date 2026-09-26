import { Button, EdgeTab, Emphasis, EntranceLines, Eyebrow, MetaList, ScrollCue, entrance, entranceStep as step } from '../ui';
import { PageContainer } from '../layout';
import { HERO_META, SITE } from '../../data/site';
import { cx } from '../../utils/cx';
import styles from './Hero.module.css';

const statement = SITE.heroStatement;

export function Hero() {
  return (
    <section className={cx(styles.hero, entrance.heroPace)} aria-labelledby="hero-heading">
      <EdgeTab label="Portfolio" />
      <PageContainer className={styles.inner}>
        <div className={styles.statement}>
          <span className={entrance.enter} style={step(0)}>
            <Eyebrow>{SITE.heroEyebrow}</Eyebrow>
          </span>
          <h1 id="hero-heading" className={styles.heading}>
            <EntranceLines lines={[statement.lead, <Emphasis key="emphasis">{statement.emphasis}</Emphasis>]} firstStep={1} />
          </h1>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.intro}>
            <p className={cx(styles.bio, entrance.enter)} style={step(3)}>
              {SITE.heroBio}
            </p>
            <div className={cx(styles.ctas, entrance.enter)} style={step(4)}>
              <Button href="/home#selected-work" arrow="right">
                View the work
              </Button>
              <Button href={`mailto:${SITE.email}`}>Say hello</Button>
            </div>
          </div>

          <MetaList
            className={styles.meta}
            rowClassName={entrance.enter}
            rowStyle={(index) => step(4 + index)}
            items={HERO_META}
          />
        </div>
      </PageContainer>

      <ScrollCue step={10} />
    </section>
  );
}
