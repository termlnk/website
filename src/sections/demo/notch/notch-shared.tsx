const PET_PIXELS = [
  { x: 1, y: 1 },
  { x: 6, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
  { x: 6, y: 2 },
  { x: 1, y: 3 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
  { x: 6, y: 3 },
  { x: 1, y: 4 },
  { x: 2, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 4 },
  { x: 5, y: 4 },
  { x: 6, y: 4 },
  { x: 2, y: 5 },
  { x: 3, y: 5 },
  { x: 4, y: 5 },
  { x: 5, y: 5 },
] as const;

export type ExternalAgentType =
  | 'claude-code'
  | 'codex'
  | 'cursor'
  | 'gemini'
  | 'copilot'
  | 'codebuddy'
  | 'opencode'
  | 'kimi-code'
  | 'unknown';

export const AGENT_COLORS: Record<ExternalAgentType, string> = {
  'claude-code': '#D97757',
  codex: '#10A37F',
  cursor: '#E5E7EB',
  gemini: '#4285F4',
  copilot: '#A78BFA',
  codebuddy: '#EC4899',
  opencode: '#F97316',
  'kimi-code': '#A855F7',
  unknown: '#9CA3AF',
};

interface ITagProps {
  children: React.ReactNode;
}

export function Tag({ children }: ITagProps) {
  return (
    <span
      className="shrink-0"
      style={{
        fontSize: 9,
        fontWeight: 500,
        color: 'rgba(255,255,255,0.5)',
        background: 'rgba(255,255,255,0.1)',
        padding: '2px 5px',
        borderRadius: 4,
      }}
    >
      {children}
    </span>
  );
}

interface IPixelPetProps {
  color: string;
  variant?: 'compact' | 'mini';
  className?: string;
}

export function PixelPet({ color, variant = 'mini', className }: IPixelPetProps) {
  const pixelSize = variant === 'compact' ? 1.75 : 2;
  const gap = 1;
  const isCompact = variant === 'compact';

  return (
    <span
      className={`relative grid shrink-0${className ? ` ${className}` : ''}`}
      style={{
        width: pixelSize * 6 + gap * 5,
        height: pixelSize * 5 + gap * 4,
        gridTemplateColumns: `repeat(6, ${pixelSize}px)`,
        gridTemplateRows: `repeat(5, ${pixelSize}px)`,
        gap,
        filter: `drop-shadow(0 0 ${isCompact ? 4 : 3}px ${color})`,
      }}
      aria-hidden="true"
    >
      {PET_PIXELS.map((pixel) => (
        <span
          key={`${pixel.x}-${pixel.y}`}
          style={{
            gridColumnStart: pixel.x,
            gridRowStart: pixel.y,
            width: pixelSize,
            height: pixelSize,
            borderRadius: 1,
            backgroundColor: color,
            boxShadow: `0 0 ${isCompact ? 5 : 4}px ${color}`,
          }}
        />
      ))}
    </span>
  );
}

interface IMiniSessionProps {
  name: string;
  agentType: ExternalAgentType;
  agent: string;
  terminal: string;
  duration: string;
  hoverable?: boolean;
}

export function MiniSession({ name, agentType, agent, terminal, duration, hoverable }: IMiniSessionProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md${hoverable ? ' transition-colors duration-150' : ''}`}
      style={{ padding: '5px 8px', fontSize: 12, cursor: hoverable ? 'pointer' : undefined }}
      onMouseEnter={hoverable ? (e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; } : undefined}
      onMouseLeave={hoverable ? (e) => { e.currentTarget.style.background = 'transparent'; } : undefined}
    >
      <PixelPet color={AGENT_COLORS[agentType]} variant="compact" />
      <span className="flex-1 truncate" style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>{name}</span>
      <div className="flex items-center gap-1 shrink-0">
        <Tag>{agent}</Tag>
        <Tag>{terminal}</Tag>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{duration}</span>
      </div>
    </div>
  );
}
