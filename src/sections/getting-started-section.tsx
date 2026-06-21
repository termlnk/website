import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/components/section-heading';

const STEPS = [
  { number: '01', key: 'step1' },
  { number: '02', key: 'step2' },
  { number: '03', key: 'step3' },
  { number: '04', key: 'step4' },
] as const;

export function GettingStartedSection() {
  const { t } = useTranslation();

  return (
    <section className="px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="GET STARTED"
        title={t('getStarted.title')}
        className="mb-14"
      />

      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col items-stretch gap-8 md:flex-row md:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.key} className="flex flex-1 items-start md:items-stretch">
              {/* Step content */}
              <div className="flex-1 text-center">
                <div className="mb-3 font-mono text-4xl font-bold text-accent drop-shadow-[0_0_12px_rgba(217,119,87,0.5)]">
                  {step.number}
                </div>
                <h3 className="mb-1 text-sm font-bold text-text">
                  {t(`getStarted.${step.key}.title`)}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted">
                  {t(`getStarted.${step.key}.desc`)}
                </p>
              </div>

              {/* Dotted connector line (between steps, desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden shrink-0 self-center md:block">
                  <div className="h-px w-8 border-t border-dashed border-fg/10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
