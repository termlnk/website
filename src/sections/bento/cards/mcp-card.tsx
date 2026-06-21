import { Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function McpCard() {
  const { t } = useTranslation();

  return (
    <GlowCard className="col-span-1 sm:col-span-2" glowColor="rgba(6, 182, 212, 0.12)">
      <div className="flex h-full flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <Wrench size={18} strokeWidth={1.8} className="text-glow-cyan" />
            <h3 className="text-base font-bold text-text">{t('bento.mcp.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.mcp.desc')}</p>
        </div>

        {/* Connected nodes visual */}
        <svg viewBox="0 0 140 64" fill="none" className="h-16 w-36 shrink-0">
          {/* Central node */}
          <circle cx="70" cy="32" r="8" className="fill-glow-cyan/15 stroke-glow-cyan/50" strokeWidth="1.2" />
          <circle cx="70" cy="32" r="3" className="fill-glow-cyan/40" />

          {/* Outer nodes */}
          <circle cx="30" cy="16" r="5" className="fill-glow-cyan/10 stroke-glow-cyan/30" strokeWidth="1" />
          <circle cx="30" cy="48" r="5" className="fill-glow-cyan/10 stroke-glow-cyan/30" strokeWidth="1" />
          <circle cx="110" cy="16" r="5" className="fill-glow-cyan/10 stroke-glow-cyan/30" strokeWidth="1" />
          <circle cx="110" cy="48" r="5" className="fill-glow-cyan/10 stroke-glow-cyan/30" strokeWidth="1" />

          {/* Connections */}
          <line x1="35" y1="18" x2="62" y2="28" className="stroke-glow-cyan/20" strokeWidth="1" />
          <line x1="35" y1="46" x2="62" y2="36" className="stroke-glow-cyan/20" strokeWidth="1" />
          <line x1="105" y1="18" x2="78" y2="28" className="stroke-glow-cyan/20" strokeWidth="1" />
          <line x1="105" y1="46" x2="78" y2="36" className="stroke-glow-cyan/20" strokeWidth="1" />

          {/* Tiny dots on connections */}
          <circle cx="48" cy="23" r="1.2" className="fill-glow-cyan/30" />
          <circle cx="92" cy="23" r="1.2" className="fill-glow-cyan/30" />
          <circle cx="48" cy="41" r="1.2" className="fill-glow-cyan/30" />
          <circle cx="92" cy="41" r="1.2" className="fill-glow-cyan/30" />
        </svg>
      </div>
    </GlowCard>
  );
}
