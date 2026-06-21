import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/themes')({
  component: ThemesPage,
});

function ThemesPage() {
  const content = useDocContent('themes');
  return <DocPage content={content} />;
}
