import { NotchLayer } from '../notch';
import { AGENT_COLORS, MiniSession, PixelPet, Tag } from '../notch-shared';

export function OverviewLayer({ active }: { active: boolean }) {
  return (
    <NotchLayer active={active} className="flex-col !items-stretch !justify-start gap-0 !p-2">
      {/* Hero session */}
      <div className="flex items-start gap-2.5 rounded-md p-2" style={{ fontSize: 12 }}>
        <PixelPet color={AGENT_COLORS['claude-code']} className="mt-[3px]" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="flex-1 font-medium text-white truncate leading-tight">fix auth bug</span>
            <Tag>Claude</Tag>
            <Tag>iTerm</Tag>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>27m</span>
          </div>
          <div className="truncate" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: 1.3 }}>
            You: fix the auth bug in middleware
          </div>
          <div style={{ fontSize: 10, lineHeight: 1.3, color: 'var(--color-work)' }}>
            Writing middleware.ts
          </div>
        </div>
      </div>

      {/* Mini sessions */}
      <MiniSession name="backend server" agentType="codex" agent="Codex" terminal="Terminal" duration="1h" />
      <MiniSession name="optimize queries" agentType="gemini" agent="Gemini" terminal="Ghostty" duration="5h" />
    </NotchLayer>
  );
}
