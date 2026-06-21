import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/ssh')({
  component: SshPage,
});

function SshPage() {
  const content = useDocContent('ssh');
  return <DocPage content={content} />;
}
