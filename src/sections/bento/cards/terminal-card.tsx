import { TerminalSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function TerminalCard() {
  const { t } = useTranslation();

  return (
    <GlowCard className="col-span-1 sm:col-span-2" glowColor="rgba(34, 197, 94, 0.12)">
      <div className="flex h-full flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <TerminalSquare size={18} strokeWidth={1.8} className="text-idle" />
            <h3 className="text-base font-bold text-text">{t('bento.terminal.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.terminal.desc')}</p>
        </div>

        {/* Split-pane terminal visual */}
        <div className="flex shrink-0 gap-1.5">
          <div className="flex h-20 w-24 flex-col gap-1 rounded-lg border border-border bg-surface p-2">
            <div className="h-1 w-8 rounded-full bg-idle/40" />
            <div className="h-1 w-12 rounded-full bg-fg/8" />
            <div className="h-1 w-6 rounded-full bg-fg/8" />
            <div className="mt-auto h-1.5 w-2 rounded-sm bg-idle/60" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex h-[38px] w-20 flex-col gap-1 rounded-lg border border-border bg-surface p-2">
              <div className="h-1 w-10 rounded-full bg-glow-blue/40" />
              <div className="h-1 w-6 rounded-full bg-fg/8" />
            </div>
            <div className="flex h-[38px] w-20 flex-col gap-1 rounded-lg border border-border bg-surface p-2">
              <div className="h-1 w-8 rounded-full bg-glow-purple/40" />
              <div className="h-1 w-5 rounded-full bg-fg/8" />
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
