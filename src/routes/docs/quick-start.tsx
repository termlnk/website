import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/quick-start')({
  component: QuickStartPage,
});

function QuickStartPage() {
  const content = useDocContent('quick-start');
  return <DocPage content={content} />;
}
