import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GithubIcon } from '@/components/icons/github-icon';
import { LanguageSwitcher } from '@/layouts/nav/language-switcher';

export function Nav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const prevRef = useRef(false);

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
    <nav
      className="fixed top-0 left-0 right-0 pointer-events-none"
      style={{ zIndex: 180 }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'linear-gradient(rgba(17,17,17,0.85) 0%, transparent 100%)',
          opacity: scrolled ? 1 : 0,
        }}
      />
      <div
        className="flex justify-between items-center mx-auto pointer-events-none"
        style={{ maxWidth: 1060, padding: '18px 24px 28px' }}
      >
        <a
          href="/"
          className="group flex items-center gap-2 no-underline uppercase pointer-events-auto text-muted hover:text-text transition-colors duration-200"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            letterSpacing: '0.08em',
            WebkitFontSmoothing: 'none',
          }}
        >
          <img
            src="/images/logo.png"
            alt="Termlnk"
            width={20}
            height={20}
            className="rounded-[5px] opacity-70 group-hover:opacity-100 transition-opacity duration-200"
          />
          TERMLNK
        </a>

        <div className="flex items-center gap-2 pointer-events-auto">
          <a
            href="/changelog"
            className="hidden sm:inline-flex items-center justify-center no-underline transition-colors duration-200 text-muted hover:text-text"
            style={{
              height: 32,
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 9,
              background: 'rgba(255,255,255,0.03)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              padding: '0 12px',
            }}
          >
            {t('nav.changelog')}
          </a>
          <LanguageSwitcher />
          <a
            href="https://github.com/termlnk/termlnk"
            aria-label={t('nav.github')}
            className="flex items-center justify-center no-underline transition-all duration-200 text-muted hover:text-text"
            style={{
              width: 32,
              height: 32,
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 9,
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
