import { Moon, Monitor, Sun } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { applyTheme, cycleTheme, getStoredTheme, setStoredTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

const ICONS = {
  system: Monitor,
  light: Sun,
  dark: Moon,
} as const;

export function ThemeToggle({ useLight = false }: { useLight?: boolean }) {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => applyTheme('system');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = cycleTheme(prev);
      setStoredTheme(next);
      return next;
    });
  }, []);

  const Icon = ICONS[theme];

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'flex h-8 w-8 cursor-pointer items-center justify-center rounded-[9px] transition-all duration-200',
        useLight
          ? 'text-white/70 hover:text-white'
          : 'text-text',
      )}
      aria-label={`Theme: ${theme}`}
      title={theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark'}
    >
      <Icon size={14} />
    </button>
  );
}
