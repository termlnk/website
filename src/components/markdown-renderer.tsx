import type { Components } from 'react-markdown';
import type { TocHeading } from '@/lib/types';
import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  onHeadingsExtracted?: (headings: TocHeading[]) => void;
}

const components: Components = {
  h1: ({ children, id, ...rest }) => (
    <h1 id={id} className="mb-4 mt-10 scroll-mt-24 text-2xl font-semibold text-text first:mt-0" {...rest}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...rest }) => (
    <h2 id={id} className="mb-3 mt-10 scroll-mt-24 text-xl font-semibold text-text first:mt-0" {...rest}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...rest }) => (
    <h3 id={id} className="mb-2 mt-8 scroll-mt-24 text-base font-semibold text-text" {...rest}>
      {children}
    </h3>
  ),
  p: ({ children, ...rest }) => (
    <p className="mb-4 text-sm leading-relaxed text-muted" {...rest}>
      {children}
    </p>
  ),
  a: ({ children, href, ...rest }) => (
    <a
      href={href}
      className="text-accent no-underline transition-colors duration-150 hover:underline"
      {...rest}
    >
      {children}
    </a>
  ),
  code: ({ children, className, ...rest }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <code className={cn('font-mono text-xs', className)} {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs text-text" {...rest}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...rest }) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg border border-border bg-surface-raised p-4"
      {...rest}
    >
      {children}
    </pre>
  ),
  ul: ({ children, ...rest }) => (
    <ul className="mb-4 grid gap-1 pl-5 text-sm text-muted" style={{ listStyleType: 'disc' }} {...rest}>
      {children}
    </ul>
  ),
  ol: ({ children, ...rest }) => (
    <ol className="mb-4 grid gap-1 pl-5 text-sm text-muted" style={{ listStyleType: 'decimal' }} {...rest}>
      {children}
    </ol>
  ),
  li: ({ children, ...rest }) => (
    <li className="leading-relaxed" {...rest}>
      {children}
    </li>
  ),
  table: ({ children, ...rest }) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...rest}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...rest }) => (
    <thead className="border-b border-border" {...rest}>
      {children}
    </thead>
  ),
  th: ({ children, ...rest }) => (
    <th className="px-3 py-2 text-left font-mono text-xs font-medium text-muted" {...rest}>
      {children}
    </th>
  ),
  td: ({ children, ...rest }) => (
    <td className="border-t border-border px-3 py-2 text-muted" {...rest}>
      {children}
    </td>
  ),
  blockquote: ({ children, ...rest }) => (
    <blockquote
      className="mb-4 border-l-2 border-accent/50 pl-4 italic text-muted/80"
      {...rest}
    >
      {children}
    </blockquote>
  ),
  hr: ({ ...rest }) => (
    <hr className="my-8 border-t border-border" {...rest} />
  ),
};

const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeSlug];

export function MarkdownRenderer({ content, className, onHeadingsExtracted }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onHeadingsExtracted || !containerRef.current) return;

    const els = containerRef.current.querySelectorAll('h2, h3');
    const headings: TocHeading[] = [];

    els.forEach((el) => {
      const id = el.id;
      const text = el.textContent || '';
      const level = el.tagName === 'H2' ? 2 : 3;
      if (id && text) {
        headings.push({ id, text, level });
      }
    });

    onHeadingsExtracted(headings);
  }, [content, onHeadingsExtracted]);

  return (
    <div ref={containerRef} className={cn('max-w-none', className)}>
      <Markdown
        remarkPlugins={REMARK_PLUGINS}
        rehypePlugins={REHYPE_PLUGINS}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  );
}
