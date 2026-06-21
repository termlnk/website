import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/faq')({
  component: FaqDocPage,
});

function FaqDocPage() {
  const content = useDocContent('faq');
  return <DocPage content={content} />;
}
