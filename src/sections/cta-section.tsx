import { useTranslation } from 'react-i18next';
import { GradientButton } from '@/components/gradient-button';
import { GithubIcon } from '@/components/icons/github-icon';

export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="relative px-6 py-28 text-center md:py-36">
      {/* Subtle radial glow background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(217,119,87,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto max-w-lg">
        <h2 className="mb-8 text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-[-0.02em] text-text">
          {t('cta.title')}
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <GradientButton href="https://github.com/termlnk/termlnk/releases">
            {t('cta.download')}
          </GradientButton>
          <GradientButton variant="secondary" href="https://github.com/termlnk/termlnk">
            <GithubIcon size={16} />
            {t('cta.github')}
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
