import type { TocHeading } from '@/lib/types';
import { useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { HeadingsProvider } from '@/lib/headings-context';
import { DocsLayout } from '@/layouts/docs/docs-layout';

export const Route = createFileRoute('/docs')({
  component: DocsRoute,
});

function DocsRoute() {
  const [headings, setHeadings] = useState<TocHeading[]>([]);

  return (
    <HeadingsProvider value={setHeadings}>
      <DocsLayout headings={headings}>
        <Outlet />
      </DocsLayout>
    </HeadingsProvider>
  );
}
