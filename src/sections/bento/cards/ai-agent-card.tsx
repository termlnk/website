import { BotMessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GlowCard } from '@/components/glow-card';

export function AiAgentCard() {
  const { t } = useTranslation();

  return (
    <GlowCard className="col-span-1 sm:col-span-2" glowColor="rgba(217, 119, 87, 0.12)">
      <div className="flex h-full flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <div className="mb-3 flex items-center gap-2">
            <BotMessageSquare size={18} strokeWidth={1.8} className="text-accent" />
            <h3 className="text-base font-bold text-text">{t('bento.aiAgent.title')}</h3>
          </div>
          <p className="text-[13px] leading-snug text-muted">{t('bento.aiAgent.desc')}</p>
        </div>

        {/* Chat bubble visual */}
        <div className="flex shrink-0 flex-col gap-2">
          <div className="ml-auto w-fit rounded-xl rounded-br-sm border border-accent/20 bg-accent/10 px-3 py-1.5">
            <div className="h-1 w-16 rounded-full bg-accent/40" />
          </div>
          <div className="mr-auto w-fit rounded-xl rounded-bl-sm border border-border bg-surface px-3 py-1.5">
            <div className="mb-1 h-1 w-20 rounded-full bg-fg/8" />
            <div className="h-1 w-12 rounded-full bg-fg/8" />
          </div>
          <div className="ml-auto w-fit rounded-xl rounded-br-sm border border-accent/20 bg-accent/10 px-3 py-1.5">
            <div className="h-1 w-10 rounded-full bg-accent/40" />
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
