import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/snippets')({
  component: SnippetsPage,
});

function SnippetsPage() {
  const content = useDocContent('snippets');
  return <DocPage content={content} />;
}
