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

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((item) => item.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative pointer-events-auto">
      <button
        type="button"
        aria-label={t('language.label')}
        aria-expanded={open}
        className={cn(
          'flex h-8 cursor-pointer items-center gap-1.5 rounded-[9px] border px-2.5 font-mono text-xs text-text transition-all duration-200 hover:bg-[rgba(255,255,255,0.06)] hover:text-text',
          {
            'border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)]': !open,
            'border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.08)] shadow-[0_12px_34px_rgba(0,0,0,0.28),inset_0_1px_rgba(255,255,255,0.08)]': open,
          }
        )}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{current.short}</span>
        <span
          className={cn('text-[10px] text-[rgba(255,255,255,0.45)] transition-transform duration-200', {
            'rotate-180': open,
          })}
        >
          ▼
        </span>
      </button>

      <div
        className="pointer-events-none invisible absolute right-0 top-[38px] w-[140px] origin-top-right translate-y-[-8px] scale-[0.98] overflow-hidden rounded-[14px] border border-[rgba(255,255,255,0.12)] bg-[rgba(22,20,32,0.94)] p-[5px] opacity-0 shadow-[0_22px_70px_rgba(0,0,0,0.55),inset_0_1px_rgba(255,255,255,0.08)] backdrop-blur-[20px] transition-[opacity,transform,visibility] duration-[180ms] ease-spring data-[open=true]:pointer-events-auto data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:scale-100 data-[open=true]:opacity-100 data-[open=true]:duration-[220ms]"
        data-open={open}
      >
        {LANGUAGES.map((item, index) => {
          const active = item.code === current.code;

          return (
            <button
              key={item.code}
              type="button"
              className={cn(
                'flex w-full translate-y-[-4px] cursor-pointer items-center justify-between rounded-[10px] border-0 px-[11px] py-2.5 text-left text-[13px] opacity-0 transition-[background-color,color,opacity,transform] duration-[180ms] hover:translate-x-0.5 hover:text-text focus-visible:translate-x-0.5 focus-visible:text-text focus-visible:outline-none data-[open=true]:translate-y-0 data-[open=true]:opacity-100',
                {
                  'bg-[rgba(59,130,246,0.16)] text-text hover:bg-[rgba(59,130,246,0.24)] focus-visible:bg-[rgba(59,130,246,0.24)]': active,
                  'bg-transparent text-[rgba(255,255,255,0.64)] hover:bg-[rgba(255,255,255,0.07)] focus-visible:bg-[rgba(255,255,255,0.07)]': !active,
                }
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
              <span className="font-mono text-[10px] text-[rgba(255,255,255,0.35)]">{item.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
