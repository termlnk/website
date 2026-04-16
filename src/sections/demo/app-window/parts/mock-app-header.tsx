import type { AppDemoScene } from '@/sections/demo/types';

interface IMockAppHeaderProps {
  activeScene: AppDemoScene;
}

const SIDE_TAB_BAR_WIDTH = 34;
const HOST_TREE_WIDTH = 168;
const TERMINAL_CONTENT_OFFSET = SIDE_TAB_BAR_WIDTH + HOST_TREE_WIDTH;

const TABS: Record<AppDemoScene, Array<{ label: string; workspace?: boolean; badge?: string }>> = {
  terminal: [
    { label: 'telan@telanMBP:~' },
  ],
  'ssh-sftp': [
    { label: 'HK-1H1G-500G' },
  ],
  'ai-agent': [
    { label: 'telan@telanMBP:~' },
  ],
  settings: [
    { label: 'telan@telanMBP:~' },
  ],
};

export function MockAppHeader({ activeScene }: IMockAppHeaderProps) {
  const tabs = TABS[activeScene];

  return (
    <div
      className="flex shrink-0"
      style={{
        height: 32,
        background: '#242633',
        borderBottom: '1px solid rgba(163,169,194,0.16)',
        boxShadow: 'inset 0 -1px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center shrink-0" style={{ width: TERMINAL_CONTENT_OFFSET, paddingLeft: 10, gap: 8 }}>
        <TrafficLights />
        <HeaderIcon kind="split" />
        <HeaderIcon kind="folder" />
      </div>

      <div className="flex h-full min-w-0 flex-1 items-end" style={{ gap: 4, paddingTop: 3 }}>
        {tabs.map((tab, index) => (
          <div
            key={`${tab.label}-${index}`}
            className="flex items-center"
            style={{
              height: 28,
              maxWidth: tab.workspace ? 145 : 180,
              padding: tab.workspace ? '0 10px' : '0 12px',
              marginBottom: -1,
              borderRadius: '7px 7px 0 0',
              background: index === 0 ? '#414456' : 'transparent',
              border: index === 0 ? '1px solid rgba(177,187,232,0.16)' : '1px solid transparent',
              borderBottomColor: index === 0 ? '#414456' : 'transparent',
              color: 'rgba(255,255,255,0.92)',
              fontSize: 11,
              fontWeight: 400,
              gap: 7,
            }}
          >
            {tab.workspace ? <GridIcon /> : <TerminalGlyph />}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tab.label}</span>
            {tab.badge && (
              <span style={{ color: 'rgba(255,255,255,0.32)', fontSize: 11, marginLeft: 2 }}>{tab.badge}</span>
            )}
            {index === 0 && <span style={{ color: 'rgba(255,255,255,0.28)', fontWeight: 400 }}>×</span>}
          </div>
        ))}

        <div
          className="flex items-center justify-center"
          style={{
            width: 26,
            height: 28,
            marginLeft: 6,
            marginBottom: -1,
            color: 'rgba(255,255,255,0.82)',
            fontSize: 20,
            fontWeight: 300,
          }}
        >
          +
        </div>
      </div>

      <div className="flex items-center justify-end shrink-0" style={{ width: 108, paddingRight: 11, gap: 14 }}>
        <NotificationIcon />
        <HeaderIcon kind="split" />
        <HeaderIcon kind="pin" />
      </div>
    </div>
  );
}

function TrafficLights() {
  return (
    <div className="flex items-center" style={{ gap: 7 }}>
      <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#ff5f57', border: '1px solid rgba(0,0,0,0.26)' }} />
      <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#ffbd2e', border: '1px solid rgba(0,0,0,0.26)' }} />
      <span style={{ width: 13, height: 13, borderRadius: '50%', background: '#28c840', border: '1px solid rgba(0,0,0,0.26)' }} />
    </div>
  );
}

function HeaderIcon({ kind }: { kind: 'split' | 'folder' | 'pin' }) {
  if (kind === 'folder') {
    return (
      <svg width={17} height={17} viewBox="0 0 20 20" fill="none" style={{ color: 'rgba(255,255,255,0.86)' }}>
        <path d="M2.5 5.5h5l1.4 1.7h8.6v8.3h-15z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
        <path d="M4.5 9.4h11" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === 'pin') {
    return (
      <svg width={16} height={16} viewBox="0 0 20 20" fill="none" style={{ color: 'rgba(255,255,255,0.86)' }}>
        <path d="M12.8 2.5 17.5 7.2l-3 1.2-3.2 5.1-1.6-1.6-4.5 4.5-1.6-1.6 4.5-4.5-1.6-1.6 5.1-3.2z" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width={16} height={16} viewBox="0 0 18 18" fill="none" style={{ color: 'rgba(255,255,255,0.86)' }}>
      <rect x={3} y={3} width={12} height={12} rx={1.5} stroke="currentColor" strokeWidth={1.8} />
      <path d="M9 3v12" stroke="currentColor" strokeWidth={1.6} />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <div className="relative" style={{ width: 18, height: 18, color: '#f5f266' }}>
      <svg width={18} height={18} viewBox="0 0 20 20" fill="none">
        <path d="M5.8 8.4c0-2.6 1.7-4.6 4.2-4.6s4.2 2 4.2 4.6v2.7l1.4 2.4H4.4l1.4-2.4z" stroke="currentColor" strokeWidth={1.7} />
        <path d="M8.2 15.2c.4.8 1 1.2 1.8 1.2s1.4-.4 1.8-1.2" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
      </svg>
      <span
        style={{
          position: 'absolute',
          top: -6,
          right: -7,
          width: 14,
          height: 14,
          borderRadius: 8,
          background: '#ff5d62',
          color: '#fff',
          fontSize: 8,
          fontWeight: 900,
          lineHeight: '14px',
          textAlign: 'center',
        }}
      >
        11
      </span>
    </div>
  );
}

function GridIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 16 16" fill="none" style={{ color: 'rgba(255,255,255,0.86)' }}>
      <rect x={2} y={2} width={4} height={4} rx={0.8} stroke="currentColor" strokeWidth={1.6} />
      <rect x={10} y={2} width={4} height={4} rx={0.8} stroke="currentColor" strokeWidth={1.6} />
      <rect x={2} y={10} width={4} height={4} rx={0.8} stroke="currentColor" strokeWidth={1.6} />
      <rect x={10} y={10} width={4} height={4} rx={0.8} stroke="currentColor" strokeWidth={1.6} />
    </svg>
  );
}

function TerminalGlyph() {
  return <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>›_</span>;
}
