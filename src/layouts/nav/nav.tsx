import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { GithubIcon } from '@/components/icons/github-icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/layouts/nav/language-switcher';
import { cn } from '@/lib/utils';

export function Nav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const prevRef = useRef(false);

  const isHeroPage = pathname === '/';
  const useLight = isHeroPage && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 20;
      if (s !== prevRef.current) {
        prevRef.current = s;
        setScrolled(s);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="pointer-events-none fixed left-0 right-0 top-0 z-[180]">
      <div
        className={cn(
          'pointer-events-none absolute inset-0 transition-all duration-500',
          !useLight ? 'bg-bg/90 backdrop-blur-xl' : 'bg-transparent',
        )}
      />
      <div className="pointer-events-none relative mx-auto flex max-w-[1200px] items-center justify-between px-6 pb-7 pt-[18px]">
        <div className="pointer-events-auto flex items-center gap-6">
          <a
            href="/"
            className={cn(
              'group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] no-underline transition-colors duration-200',
              useLight ? 'text-white/80 hover:text-white' : 'text-text',
            )}
          >
            <img
              src="/images/logo.png"
              alt="Termlnk"
              width={20}
              height={20}
              className="rounded-[5px] opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            />
            TERMLNK
          </a>

          <div className="hidden items-center gap-5 sm:flex">
            <NavLink href="/docs" useLight={useLight}>{t('nav.docs')}</NavLink>
            <NavLink href="/changelog" useLight={useLight}>{t('nav.changelog')}</NavLink>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2.5">
          <LanguageSwitcher useLight={useLight} />
          <ThemeToggle useLight={useLight} />
          <a
            href="https://github.com/termlnk/termlnk"
            aria-label={t('nav.github')}
            className={cn(
              'flex h-8 items-center gap-1.5 rounded-[9px] px-3 font-mono text-[11px] no-underline transition-all duration-200',
              useLight
                ? 'bg-white/15 text-white/90 backdrop-blur-sm hover:bg-white/25 hover:text-white'
                : 'bg-fg/90 text-bg hover:bg-fg',
            )}
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, useLight, children }: { href: string; useLight: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        'rounded-lg px-3 py-1.5 text-[13px] no-underline transition-all duration-200',
        useLight
          ? 'text-white/80 hover:bg-white/15 hover:text-white'
          : 'text-text hover:bg-fg/[0.06]',
      )}
    >
      {children}
    </a>
  );
}
