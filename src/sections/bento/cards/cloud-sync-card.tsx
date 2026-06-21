import { Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function CloudSyncCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(6, 182, 212, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        <svg viewBox="0 0 160 56" fill="none" className="h-14 w-full">
          {/* Cloud shape */}
          <path
            d="M100 38H56a14 14 0 01-1.6-27.9A18 18 0 0188 14a18 18 0 0116.8 11.5A11 11 0 01104 46h-4"
            className="fill-question/8 stroke-question/30"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Sync arrows */}
          <path d="M72 24v10" className="stroke-question/45" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="68,28 72,24 76,28" className="stroke-question/45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          <path d="M88 34V24" className="stroke-question/45" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="84,30 88,34 92,30" className="stroke-question/45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Data dots */}
          <circle cx="62" cy="40" r="1.5" className="fill-question/25" />
          <circle cx="80" cy="42" r="1.5" className="fill-question/20" />
          <circle cx="98" cy="40" r="1.5" className="fill-question/25" />
        </svg>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <Cloud size={18} strokeWidth={1.8} className="text-question" />
            <h3 className="text-base font-bold text-text">{t('bento.cloudSync.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.cloudSync.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
