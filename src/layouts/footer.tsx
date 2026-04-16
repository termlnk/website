import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      className="flex justify-between mx-auto"
      style={{
        padding: '32px 24px',
        fontSize: 12,
        color: 'var(--color-muted)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        maxWidth: 960,
      }}
    >
      <div className="flex gap-2">
        <span>{t('footer.copyright', { year })}</span>
        <span>&middot;</span>
        <FooterLink href="https://github.com/termlnk/termlnk/blob/main/LICENSE">
          PolyForm Noncommercial 1.0.0
        </FooterLink>
      </div>
      <div className="flex gap-2">
        <FooterLink href="mailto:support@termlnk.com">{t('footer.contact')}</FooterLink>
        <span>&middot;</span>
        <FooterLink href="/changelog">{t('footer.changelog')}</FooterLink>
        <span>&middot;</span>
        <FooterLink href="https://x.com/telanflow">X</FooterLink>
        <span>&middot;</span>
        <span>Made with ❤️ by Termlnk Team</span>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      className="no-underline transition-colors duration-150 text-muted hover:text-text"
      rel={isExternal ? 'noreferrer' : undefined}
      target={isExternal ? '_blank' : undefined}
    >
      {children}
    </a>
  );
}
