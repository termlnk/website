import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/keybindings')({
  component: KeybindingsPage,
});

function KeybindingsPage() {
  const content = useDocContent('keybindings');
  return <DocPage content={content} />;
}
