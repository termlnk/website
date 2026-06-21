import { Disc3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function IslandCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(168, 85, 247, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        <svg viewBox="0 0 160 56" fill="none" className="h-14 w-full">
          {/* Island capsule */}
          <rect x="26" y="10" rx="18" ry="18" width="108" height="36" className="fill-fg/8 stroke-explore/20" strokeWidth="1.2" />

          {/* Left avatar with ring */}
          <circle cx="50" cy="28" r="10" className="fill-explore/10 stroke-explore/30" strokeWidth="1" />
          <circle cx="50" cy="28" r="5" className="fill-explore/20 stroke-explore/40" strokeWidth="0.8" />
          <circle cx="50" cy="28" r="2" className="fill-explore/50" />

          {/* Status text */}
          <rect x="68" y="21" rx="2" width="30" height="4" className="fill-fg/15" />
          <rect x="68" y="28" rx="1.5" width="20" height="3" className="fill-fg/8" />

          {/* Right action button */}
          <rect x="106" y="18" rx="10" width="20" height="20" className="fill-explore/10 stroke-explore/25" strokeWidth="0.8" />
          <path d="M113 28h6M116 25v6" className="stroke-explore/50" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <Disc3 size={18} strokeWidth={1.8} className="text-explore" />
            <h3 className="text-base font-bold text-text">{t('bento.island.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.island.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
