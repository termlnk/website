import { History } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function SessionRestoreCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(34, 197, 94, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        {/* Circular restore visual */}
        <svg viewBox="0 0 120 48" fill="none" className="h-12 w-full">
          <path
            d="M52 24a10 10 0 1 1 2.9-7.1"
            className="stroke-idle/50"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <polyline
            points="50,14 55,17 52,21"
            className="stroke-idle/50"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="67" cy="24" r="1.5" className="fill-idle/40" />
          <line x1="67" y1="19" x2="67" y2="24" className="stroke-idle/40" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="67" y1="24" x2="70" y2="26" className="stroke-idle/40" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <History size={18} strokeWidth={1.8} className="text-idle" />
            <h3 className="text-base font-bold text-text">{t('bento.sessionRestore.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.sessionRestore.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
