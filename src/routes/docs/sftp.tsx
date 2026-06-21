import { createFileRoute } from '@tanstack/react-router';
import { DocPage } from '@/layouts/docs/doc-page';
import { useDocContent } from '@/lib/doc-loader';

export const Route = createFileRoute('/docs/sftp')({
  component: SftpPage,
});

function SftpPage() {
  const content = useDocContent('sftp');
  return <DocPage content={content} />;
}
