import { PlugZap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function ExtensionsCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(168, 85, 247, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        {/* Puzzle piece visual */}
        <svg viewBox="0 0 120 48" fill="none" className="h-12 w-full">
          {/* Main puzzle piece */}
          <path
            d="M46 14h8c0-3 2-5 5-5s5 2 5 5h8v8c3 0 5 2 5 5s-2 5-5 5v8H46V14z"
            className="fill-glow-purple/15 stroke-glow-purple/40"
            strokeWidth="1.2"
          />
          {/* Second piece outline */}
          <path
            d="M72 22h6v4c2 0 3.5 1.5 3.5 3.5S80 33 78 33v4h-6"
            className="stroke-glow-purple/25"
            strokeWidth="1"
            strokeDasharray="2 2"
            fill="none"
          />
        </svg>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <PlugZap size={18} strokeWidth={1.8} className="text-glow-purple" />
            <h3 className="text-base font-bold text-text">{t('bento.extensions.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.extensions.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
