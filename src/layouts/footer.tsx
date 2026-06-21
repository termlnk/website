import { useTranslation } from 'react-i18next';
import { GithubIcon } from '@/components/icons/github-icon';

const PRODUCT_LINKS = [
  { key: 'footer.download', href: 'https://github.com/termlnk/termlnk/releases' },
  { key: 'footer.changelog', href: '/changelog' },
  { key: 'footer.docs', href: '/docs' },
] as const;

const COMMUNITY_LINKS = [
  { key: 'nav.github', href: 'https://github.com/termlnk/termlnk', icon: <GithubIcon size={12} /> },
  { key: 'footer.twitter', href: 'https://x.com/telanflow', label: 'X' },
  { key: 'footer.contact', href: 'mailto:support@termlnk.com' },
] as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-16 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Termlnk" width={20} height={20} className="rounded-[5px] opacity-70" />
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Termlnk</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted/70">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted/60">
            {t('footer.product')}
          </h4>
          <ul className="grid gap-2">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.key}>
                <FooterLink href={link.href}>{t(link.key)}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted/60">
            {t('footer.community')}
          </h4>
          <ul className="grid gap-2">
            {COMMUNITY_LINKS.map((link) => (
              <li key={link.key}>
                <FooterLink href={link.href}>
                  {'icon' in link && <span className="opacity-60">{link.icon}</span>}
                  {'label' in link ? link.label : t(link.key)}
                </FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-between border-t border-border px-6 py-5">
        <span className="text-[11px] text-muted/50">{t('footer.copyright', { year })}</span>
        <FooterLink href="https://github.com/termlnk/termlnk/blob/main/LICENSE">
          PolyForm Noncommercial 1.0.0
        </FooterLink>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 text-xs no-underline text-muted/70 transition-colors duration-150 hover:text-text"
      rel={isExternal ? 'noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    >
      {children}
    </a>
  );
}
