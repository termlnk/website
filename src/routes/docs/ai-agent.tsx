import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/ai-agent')({
  component: AiAgentPage,
});

function AiAgentPage() {
  const content = useDocContent('ai-agent');
  return <DocPage content={content} />;
}
