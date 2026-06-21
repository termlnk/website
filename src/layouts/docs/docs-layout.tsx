import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { TocHeading } from '@/lib/types';
import { DocsSidebar } from '@/layouts/docs/docs-sidebar';
import { DocsToc } from '@/layouts/docs/docs-toc';
import { cn } from '@/lib/utils';

interface DocsLayoutProps {
  children: React.ReactNode;
  headings?: TocHeading[];
}

export function DocsLayout({ children, headings = [] }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh pt-24">
      {/* Mobile sidebar toggle */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface shadow-lg transition-colors duration-150',
            'hover:bg-surface-raised'
          )}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {sidebarOpen ? <X size={18} className="text-text" /> : <Menu size={18} className="text-muted" />}
        </button>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_200px]">
        <DocsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 pb-24 pt-2">
          {children}
        </main>

        <DocsToc headings={headings} />
      </div>
    </div>
  );
}
