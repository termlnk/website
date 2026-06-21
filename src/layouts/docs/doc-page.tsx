import { MarkdownRenderer } from '@/components/markdown-renderer';
import { useHeadingsExtracted } from '@/lib/headings-context';

interface DocPageProps {
  content: string;
}

export function DocPage({ content }: DocPageProps) {
  const onHeadingsExtracted = useHeadingsExtracted();

  return (
    <MarkdownRenderer
      content={content}
      onHeadingsExtracted={onHeadingsExtracted}
    />
  );
}
