import { Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

const SWATCHES = [
  'bg-[#e06c75]',
  'bg-[#e5c07b]',
  'bg-[#98c379]',
  'bg-[#61afef]',
  'bg-[#c678dd]',
];

export function ThemesCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(168, 85, 247, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        {/* Color swatches visual */}
        <div className="flex items-center justify-center gap-2.5">
          {SWATCHES.map((color, i) => (
            <div
              key={i}
              className={`h-6 w-6 rounded-full ${color} opacity-70 ring-1 ring-fg/10`}
            />
          ))}
        </div>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <Palette size={18} strokeWidth={1.8} className="text-glow-purple" />
            <h3 className="text-base font-bold text-text">{t('bento.themes.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.themes.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
