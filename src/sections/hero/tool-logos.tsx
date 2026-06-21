import { useTranslation } from 'react-i18next';

interface ITool {
  name: string;
  dotClass: string;
}

const TOOLS: ITool[] = [
  { name: 'Claude Code', dotClass: 'bg-glow-orange' },
  { name: 'Codex', dotClass: 'bg-idle' },
  { name: 'Gemini CLI', dotClass: 'bg-glow-blue' },
  { name: 'Cursor', dotClass: 'bg-glow-purple' },
  { name: 'OpenCode', dotClass: 'bg-glow-cyan' },
];

export function ToolLogos() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      <span className="font-mono text-xs text-white/60">{t('hero.worksWith')}</span>
      {TOOLS.map((tool) => (
        <span key={tool.name} className="inline-flex items-center gap-1.5">
          <span className={`block size-1.5 rounded-full ${tool.dotClass}`} />
          <span className="font-mono text-xs text-white/80">{tool.name}</span>
        </span>
      ))}
    </div>
  );
}
