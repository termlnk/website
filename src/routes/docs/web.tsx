import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/web')({
  component: WebPage,
});

function WebPage() {
  const content = useDocContent('web');
  return <DocPage content={content} />;
}
