import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/extensions')({
  component: ExtensionsPage,
});

function ExtensionsPage() {
  const content = useDocContent('extensions');
  return <DocPage content={content} />;
}
