import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/terminal')({
  component: TerminalPage,
});

function TerminalPage() {
  const content = useDocContent('terminal');
  return <DocPage content={content} />;
}
