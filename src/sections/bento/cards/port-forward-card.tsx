import { ArrowLeftRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function PortForwardCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(59, 130, 246, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        <svg viewBox="0 0 160 56" fill="none" className="h-14 w-full">
          {/* Local terminal */}
          <rect x="14" y="10" rx="4" width="40" height="36" className="fill-glow-blue/8 stroke-glow-blue/25" strokeWidth="1" />
          <circle cx="22" cy="17" r="1.5" className="fill-glow-blue/30" />
          <circle cx="28" cy="17" r="1.5" className="fill-glow-blue/20" />
          <circle cx="34" cy="17" r="1.5" className="fill-glow-blue/15" />
          <rect x="20" y="24" rx="1.5" width="16" height="3" className="fill-glow-blue/25" />
          <rect x="20" y="30" rx="1.5" width="24" height="3" className="fill-glow-blue/15" />
          <rect x="20" y="36" rx="1.5" width="12" height="3" className="fill-glow-blue/10" />

          {/* Tunnel */}
          <line x1="58" y1="28" x2="96" y2="28" className="stroke-glow-blue/25" strokeWidth="1.2" strokeDasharray="4 3" />
          <circle cx="68" cy="28" r="1.5" className="fill-glow-blue/25" />
          <circle cx="80" cy="28" r="1.5" className="fill-glow-blue/25" />
          <polygon points="94,24.5 99,28 94,31.5" className="fill-glow-blue/35" />

          {/* Remote server */}
          <rect x="106" y="10" rx="4" width="40" height="36" className="fill-glow-blue/8 stroke-glow-blue/25" strokeWidth="1" />
          <rect x="114" y="17" rx="2" width="24" height="7" className="fill-glow-blue/8 stroke-glow-blue/18" strokeWidth="0.8" />
          <circle cx="118" cy="20.5" r="1.5" className="fill-glow-blue/35" />
          <rect x="114" y="28" rx="2" width="24" height="7" className="fill-glow-blue/8 stroke-glow-blue/18" strokeWidth="0.8" />
          <circle cx="118" cy="31.5" r="1.5" className="fill-glow-blue/35" />
        </svg>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <ArrowLeftRight size={18} strokeWidth={1.8} className="text-glow-blue" />
            <h3 className="text-base font-bold text-text">{t('bento.portForward.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.portForward.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
