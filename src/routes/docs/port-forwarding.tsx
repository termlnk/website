import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/port-forwarding')({
  component: PortForwardingPage,
});

function PortForwardingPage() {
  const content = useDocContent('port-forwarding');
  return <DocPage content={content} />;
}
