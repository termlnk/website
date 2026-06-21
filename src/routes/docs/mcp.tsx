import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/mcp')({
  component: McpPage,
});

function McpPage() {
  const content = useDocContent('mcp');
  return <DocPage content={content} />;
}
