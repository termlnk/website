import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'en', short: 'EN', key: 'language.en' },
  { code: 'zh-CN', short: '简', key: 'language.zh-CN' },
  { code: 'zh-TW', short: '繁', key: 'language.zh-TW' },
  { code: 'ja', short: '日', key: 'language.ja' },
  { code: 'ko', short: '한', key: 'language.ko' },
] as const;

export function LanguageSwitcher({ useLight = false }: { useLight?: boolean }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((item) => item.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={rootRef} className="pointer-events-auto relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        aria-label={t('language.label')}
        aria-expanded={open}
        className={cn(
          'flex h-8 cursor-pointer items-center gap-1.5 rounded-[9px] border-0 px-2.5 font-mono text-xs transition-all duration-200',
          open
            ? useLight
              ? 'bg-white/20 text-white'
              : 'bg-fg/[0.08] text-text shadow-[0_12px_34px_rgba(0,0,0,0.15)]'
            : useLight
              ? 'text-white/80 hover:text-white'
              : 'text-text',
        )}
        onClick={() => setOpen(true)}
      >
        <span>{current.short}</span>
        <span
          className={cn('text-[10px] transition-transform duration-200', {
            'rotate-180': open,
            'text-white/50': useLight,
            'text-fg/40': !useLight,
          })}
        >
          ▼
        </span>
      </button>

      <div
        className={cn(
          'pointer-events-none invisible absolute right-0 top-[38px] w-[140px] origin-top-right translate-y-[-8px] scale-[0.98] overflow-hidden rounded-xl border border-border bg-surface/95 p-[5px] opacity-0 shadow-[0_22px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-[180ms] ease-spring',
          'data-[open=true]:pointer-events-auto data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:scale-100 data-[open=true]:opacity-100 data-[open=true]:duration-[220ms]',
        )}
        data-open={open}
      >
        {LANGUAGES.map((item, index) => {
          const active = item.code === current.code;

          return (
            <button
              key={item.code}
              type="button"
              className={cn(
                'flex w-full translate-y-[-4px] cursor-pointer items-center justify-between rounded-lg border-0 px-[11px] py-2.5 text-left text-[13px] opacity-0 transition-[background-color,color,opacity,transform] duration-[180ms] focus-visible:outline-none data-[open=true]:translate-y-0 data-[open=true]:opacity-100',
                {
                  'bg-glow-blue/15 text-text hover:bg-glow-blue/25': active,
                  'bg-transparent text-muted hover:bg-fg/[0.06] hover:text-text': !active,
                },
              )}
              data-open={open}
              style={{ transitionDelay: open ? `${index * 22}ms` : '0ms' }}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                void i18n.changeLanguage(item.code);
                setOpen(false);
              }}
            >
              <span>{t(item.key)}</span>
              <span className="font-mono text-[10px] text-muted/60">{item.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
