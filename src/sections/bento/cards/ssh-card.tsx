import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function SshCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(59, 130, 246, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        {/* Host tree visual */}
        <svg viewBox="0 0 120 56" fill="none" className="h-14 w-full">
          <circle cx="20" cy="28" r="4" className="fill-glow-blue/30 stroke-glow-blue/60" strokeWidth="1" />
          <line x1="24" y1="28" x2="48" y2="14" className="stroke-fg/15" strokeWidth="1" />
          <line x1="24" y1="28" x2="48" y2="28" className="stroke-fg/15" strokeWidth="1" />
          <line x1="24" y1="28" x2="48" y2="42" className="stroke-fg/15" strokeWidth="1" />
          <circle cx="52" cy="14" r="3" className="fill-glow-blue/20 stroke-glow-blue/40" strokeWidth="1" />
          <circle cx="52" cy="28" r="3" className="fill-glow-blue/20 stroke-glow-blue/40" strokeWidth="1" />
          <circle cx="52" cy="42" r="3" className="fill-glow-blue/20 stroke-glow-blue/40" strokeWidth="1" />
          <rect x="64" y="10" rx="2" width="32" height="8" className="fill-fg/5 stroke-fg/12" strokeWidth="0.5" />
          <rect x="64" y="24" rx="2" width="40" height="8" className="fill-fg/5 stroke-fg/12" strokeWidth="0.5" />
          <rect x="64" y="38" rx="2" width="28" height="8" className="fill-fg/5 stroke-fg/12" strokeWidth="0.5" />
        </svg>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <Globe size={18} strokeWidth={1.8} className="text-glow-blue" />
            <h3 className="text-base font-bold text-text">{t('bento.ssh.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.ssh.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
