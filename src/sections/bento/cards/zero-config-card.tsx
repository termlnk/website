import { WandSparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function ZeroConfigCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(249, 115, 22, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        {/* Wand sparkle visual */}
        <svg viewBox="0 0 120 48" fill="none" className="h-12 w-full">
          {/* Wand */}
          <line x1="40" y1="36" x2="72" y2="8" className="stroke-alert/50" strokeWidth="2" strokeLinecap="round" />
          {/* Sparkles */}
          <circle cx="74" cy="6" r="2" className="fill-alert/60" />
          <circle cx="82" cy="12" r="1.2" className="fill-alert/40" />
          <circle cx="78" cy="18" r="1" className="fill-alert/30" />
          <circle cx="68" cy="4" r="1" className="fill-alert/30" />
          {/* Rays */}
          <line x1="74" y1="1" x2="74" y2="4" className="stroke-alert/30" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="79" y1="6" x2="82" y2="6" className="stroke-alert/30" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="77" y1="3" x2="79" y2="1" className="stroke-alert/30" strokeWidth="0.8" strokeLinecap="round" />
        </svg>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <WandSparkles size={18} strokeWidth={1.8} className="text-alert" />
            <h3 className="text-base font-bold text-text">{t('bento.zeroConfig.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.zeroConfig.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
