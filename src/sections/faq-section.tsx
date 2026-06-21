import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/components/section-heading';

const FAQ_KEYS = ['platforms', 'agents', 'approval', 'data', 'setup', 'resources', 'opensource'] as const;

export function FaqSection() {
  const { t } = useTranslation();

  return (
    <section id="faq" className="mx-auto max-w-[800px] px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="FAQ"
        title={t('faq.title')}
        className="mb-12"
      />

      <div>
        {FAQ_KEYS.map((key) => (
          <details
            key={key}
            className="group border-b border-border"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[15px] font-medium text-text/80 transition-colors duration-200 hover:text-text">
              {t(`faq.items.${key}.question`)}
              <span className="ml-4 flex h-5 w-5 shrink-0 items-center justify-center text-muted/60 transition-transform duration-300 ease-spring group-open:rotate-45">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="7" y1="1" x2="7" y2="13" />
                  <line x1="1" y1="7" x2="13" y2="7" />
                </svg>
              </span>
            </summary>
            <p className="pb-5 pr-10 text-[13px] leading-[1.7] text-muted">
              {t(`faq.items.${key}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
