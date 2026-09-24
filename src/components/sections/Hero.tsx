import { Eyebrow, Button, MetaList, EdgeTab, EntranceLines, entrance, entranceStep as step } from '../ui';
import { PageContainer } from '../layout';
import { SITE, SOCIAL_LINKS } from '../../data/site';
import { cx } from '../../utils/cx';
import styles from './Hero.module.css';

const emailLink = SOCIAL_LINKS.find((link) => link.label === 'Email');
const nameLines = SITE.name.split(' ');
const afterName = 1 + nameLines.length;

export function Hero() {
  return (
    <section className={cx(styles.hero, entrance.heroPace)} aria-labelledby="hero-heading">
      <EdgeTab label="Portfolio" />
      <PageContainer className={styles.grid}>
        <div className={styles.copy}>
          <span className={entrance.enter} style={step(0)}>
            <Eyebrow>{SITE.roleTagline}</Eyebrow>
          </span>
          <h1 id="hero-heading" className={styles.name}>
            <EntranceLines lines={nameLines} firstStep={1} />
          </h1>
          <p className={cx(styles.lede, entrance.enter)} style={step(afterName)}>
            {SITE.heroLede}
          </p>
          <p className={cx(styles.bio, entrance.enter)} style={step(afterName + 1)}>
            {SITE.heroBio}
          </p>
          <div className={cx(styles.ctaRow, entrance.enter)} style={step(afterName + 2)}>
            <Button href="/home#selected-work">View the work →</Button>
            <Button href={emailLink?.href}>Say hello</Button>
          </div>
        </div>

        <MetaList
          className={styles.specimen}
          rowClassName={entrance.enter}
          rowStyle={(index) => step(afterName + 3 + index)}
          items={[
            { label: 'Stack', value: SITE.stackSummary },
            { label: 'AI', value: SITE.aiSummary },
            { label: 'Based', value: SITE.location },
            { label: 'Status', value: SITE.status },
          ]}
        />
      </PageContainer>
    </section>
  );
}
