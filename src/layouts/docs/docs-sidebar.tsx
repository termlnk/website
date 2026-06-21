import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { DOCS_NAV } from '@/layouts/docs/docs-nav-config';
import { cn } from '@/lib/utils';

interface DocsSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function DocsSidebar({ open, onClose }: DocsSidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, '');

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 z-50 h-dvh w-[280px] overflow-y-auto border-r border-border bg-bg pb-8 pt-24 lg:sticky lg:top-24 lg:z-auto lg:block lg:h-[calc(100vh-6rem)] lg:w-auto lg:border-r-0 lg:bg-transparent lg:pt-0',
          open ? 'block' : 'hidden'
        )}
      >
        <nav className="px-4 lg:px-0">
          {DOCS_NAV.map((section) => (
            <div key={section.titleKey} className="mb-6">
              <h4 className="mb-2 px-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted/60">
                {t(section.titleKey as never)}
              </h4>
              <ul className="grid gap-0.5">
                {section.items.map((item) => {
                  const href = item.slug ? `/docs/${item.slug}` : '/docs';
                  const isActive = currentPath === href || currentPath === `${href}/`;

                  return (
                    <li key={item.slug}>
                      <a
                        href={href}
                        onClick={onClose}
                        className={cn(
                          'block rounded-lg px-2 py-1.5 text-[13px] no-underline transition-colors duration-150',
                          isActive
                            ? 'bg-surface-raised text-accent'
                            : 'text-muted hover:bg-surface hover:text-text'
                        )}
                      >
                        {t(item.titleKey as never)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
