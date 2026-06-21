import { useEffect, useMemo, useRef, useState } from 'react';
import type { TocHeading } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DocsTocProps {
  headings: TocHeading[];
}

export function DocsToc({ headings }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filtered = useMemo(
    () => headings.filter((h) => h.level === 2 || h.level === 3),
    [headings],
  );

  useEffect(() => {
    if (filtered.length === 0) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    observerRef.current = observer;

    for (const heading of filtered) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [filtered]);

  if (filtered.length === 0) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24">
        <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted/60">
          On this page
        </h4>
        <ul className="grid gap-1">
          {filtered.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block text-[12px] leading-snug no-underline transition-colors duration-150',
                  heading.level === 3 ? 'pl-3' : '',
                  activeId === heading.id
                    ? 'text-accent'
                    : 'text-muted/70 hover:text-text'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  window.history.replaceState(null, '', `#${heading.id}`);
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
