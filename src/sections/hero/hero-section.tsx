import { useTranslation } from 'react-i18next';
import { DownloadButton } from '@/sections/hero/download-button';
import { TextCycle } from '@/sections/hero/text-cycle';
import { ToolLogos } from '@/sections/hero/tool-logos';

const CYCLE_KEYS = [
  'hero.cycle.developers',
  'hero.cycle.ssh',
  'hero.cycle.sftp',
  'hero.cycle.aiAgents',
  'hero.cycle.plugins',
  'hero.cycle.workflows',
] as const;
const CYCLE_COLORS: Record<typeof CYCLE_KEYS[number], string> = {
  'hero.cycle.developers': '#ffffff',
  'hero.cycle.ssh': '#22c55e',
  'hero.cycle.sftp': '#06b6d4',
  'hero.cycle.aiAgents': '#f97316',
  'hero.cycle.plugins': '#a855f7',
  'hero.cycle.workflows': '#3b82f6',
};

export function HeroSection() {
  const { t } = useTranslation();
  const cycleItems = CYCLE_KEYS.map((key) => t(key));
  const cycleColors = CYCLE_KEYS.reduce<Record<string, string>>((acc, key) => {
    acc[t(key)] = CYCLE_COLORS[key];
    return acc;
  }, {});

  return (
    <section className="relative min-h-dvh overflow-hidden">
      {/* Background image — full bleed */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Bottom fade to site background */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-[140px] text-center md:pt-[160px]">
        {/* Title */}
        <h1 className="mb-5 max-w-4xl font-mono text-[clamp(36px,7vw,72px)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
          {t('hero.titleLine1')}
          <br />
          <span className="whitespace-nowrap">
            {t('hero.titleLine2')}
            {' '}
            <TextCycle
              items={cycleItems}
              colors={cycleColors}
              className="inline-block"
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] md:text-lg">
          {t('hero.subtitle')}
        </p>

        {/* CTA buttons */}
        <div className="relative z-[160] mb-10 flex flex-wrap items-center justify-center gap-3">
          <DownloadButton />
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3 text-sm font-medium text-white no-underline backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/20"
          >
            {t('hero.viewDocs')}
          </a>
        </div>

        {/* Tool logos */}
        <div className="mb-12">
          <ToolLogos />
        </div>

        {/* Live app demo — embedded via iframe for the website showcase */}
        <div className="mx-auto mb-5 w-full max-w-[1100px]">
          <div className="relative overflow-hidden rounded-xl shadow-[0_-8px_60px_rgba(0,0,0,0.4)]">
            <iframe
              src={import.meta.env.VITE_DEMO_URL || 'https://demo.termlnk.com'}
              className="block w-full border-0"
              style={{ aspectRatio: '16 / 10' }}
              title="Termlnk Demo"
              allow="clipboard-write"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
