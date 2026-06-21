import { FileCode2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function SnippetsCard() {
  const { t } = useTranslation();

  return (
    <GlowCard glowColor="rgba(249, 115, 22, 0.12)">
      <div className="flex flex-col gap-4 p-6">
        <svg viewBox="0 0 160 56" fill="none" className="h-14 w-full">
          {/* Editor frame */}
          <rect x="28" y="6" rx="4" width="104" height="44" className="fill-alert/6 stroke-alert/18" strokeWidth="1" />

          {/* Title bar */}
          <circle cx="36" cy="14" r="1.8" className="fill-alert/30" />
          <circle cx="43" cy="14" r="1.8" className="fill-alert/22" />
          <circle cx="50" cy="14" r="1.8" className="fill-alert/15" />
          <rect x="62" y="12" rx="1.5" width="30" height="3.5" className="fill-fg/10" />

          {/* Divider */}
          <line x1="32" y1="20" x2="128" y2="20" className="stroke-alert/10" strokeWidth="0.6" />

          {/* Code lines */}
          <rect x="36" y="25" rx="1.5" width="32" height="3.5" className="fill-alert/25" />
          <rect x="36" y="32" rx="1.5" width="52" height="3.5" className="fill-alert/15" />
          <rect x="36" y="39" rx="1.5" width="22" height="3.5" className="fill-alert/10" />
          <rect x="62" y="39" rx="1.5" width="30" height="3.5" className="fill-alert/18" />

          {/* Cursor blink */}
          <rect x="96" y="25" rx="0.5" width="1.5" height="3.5" className="fill-alert/40" />
        </svg>

        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <FileCode2 size={18} strokeWidth={1.8} className="text-alert" />
            <h3 className="text-base font-bold text-text">{t('bento.snippets.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.snippets.desc')}</p>
        </div>
      </div>
    </GlowCard>
  );
}
