import { MetaList, LinkStack, EdgeTab } from '../ui';
import { PageContainer } from '../layout';
import type { CaseStudyContent } from '../../data/types';
import styles from './CaseStudyHero.module.css';

interface CaseStudyHeroProps {
  content: CaseStudyContent;
}

/** Title, dek, and Role/Stack/Links meta at the top of a case study. */
export function CaseStudyHero({ content }: CaseStudyHeroProps) {
  return (
    <header className={styles.hero}>
      <EdgeTab label="Portfolio" />
      <PageContainer className={styles.inner}>
        <p className={styles.kicker}>
          {content.index} · {content.category}
        </p>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.dek}>{content.dek}</p>

        <MetaList
          className={styles.meta}
          items={[
            { label: 'Role', value: content.meta.role },
            { label: 'Stack', value: content.meta.stack },
            {
              label: 'Links',
              value:
                content.meta.links.length > 1 ? (
                  <LinkStack links={content.meta.links} />
                ) : (
                  <a
                    href={content.meta.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.meta.links[0].label}
                  </a>
                ),
            },
          ]}
        />
      </PageContainer>
    </header>
  );
}
