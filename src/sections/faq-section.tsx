import { useTranslation } from 'react-i18next';

const FAQ_KEYS = ['platforms', 'agents', 'approval', 'data', 'setup', 'resources', 'opensource'] as const;

export function FaqSection() {
  const { t } = useTranslation();

  return (
    <section
      id="faq"
      className="mx-auto"
      style={{ padding: '64px 24px', maxWidth: 640 }}
    >
      <h2
        className="text-center"
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: 'var(--color-text)',
          marginBottom: 24,
        }}
      >
        {t('faq.title')}
      </h2>

      <div>
        {FAQ_KEYS.map((key) => (
          <details
            key={key}
            className="group"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <summary
              className="flex items-center justify-between cursor-pointer list-none"
              style={{
                padding: '16px 0',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-text)',
              }}
            >
              {t(`faq.items.${key}.question`)}
              <span
                className="shrink-0 ml-4 transition-transform duration-250 group-open:rotate-45"
                style={{
                  fontSize: 18,
                  fontWeight: 300,
                  color: 'var(--color-muted)',
                }}
              >
                +
              </span>
            </summary>
            <p
              style={{
                fontSize: 13,
                color: 'var(--color-muted)',
                lineHeight: 1.6,
                margin: 0,
                padding: '0 0 16px',
              }}
            >
              {t(`faq.items.${key}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
