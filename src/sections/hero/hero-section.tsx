import { useTranslation } from 'react-i18next';
import { DownloadButton } from '@/sections/hero/download-button';
import { ParticleGrid } from '@/sections/hero/particle-grid';
import { TextCycle } from '@/sections/hero/text-cycle';

const CYCLE_KEYS = [
  'hero.cycle.developers',
  'hero.cycle.ssh',
  'hero.cycle.sftp',
  'hero.cycle.aiAgents',
  'hero.cycle.plugins',
  'hero.cycle.workflows',
] as const;
const CYCLE_COLORS: Record<typeof CYCLE_KEYS[number], string> = {
  'hero.cycle.developers': '#e5e5e5',
  'hero.cycle.ssh': '#22c55e',
  'hero.cycle.sftp': '#06b6d4',
  'hero.cycle.aiAgents': '#d97757',
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
    <section
      className="relative text-center"
      style={{ padding: '180px 24px 20px' }}
    >
      <ParticleGrid />

      <div className="relative z-[1]">
        <h1
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 60,
            fontWeight: 400,
            lineHeight: '76px',
            letterSpacing: 0,
            color: 'var(--color-text)',
            margin: '0 0 14px',
            WebkitFontSmoothing: 'none',
            imageRendering: 'pixelated',
          }}
        >
          {t('hero.titleLine1')}
          <br />
          {t('hero.titleLine2')}
          {' '}
          <TextCycle
            items={cycleItems}
            colors={cycleColors}
            className="inline-block"
          />
        </h1>
      </div>

      <p
        className="relative z-[1] mx-auto"
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: 520,
          margin: '0 auto 32px',
        }}
      >
        {t('hero.subtitleLine1')}
        <br />
        {t('hero.subtitleLine2')}
      </p>

      <div
        className="relative z-[160] flex gap-3 justify-center items-center"
        style={{ marginBottom: 16 }}
      >
        <DownloadButton />
      </div>
    </section>
  );
}
