import { ChevronRight, CirclePlus, FolderOpen, FolderPlus, RotateCw, TerminalSquare } from 'lucide-react';

interface IHostGroup {
  name: string;
  hosts: string[];
}

const DEFAULT_GROUPS: IHostGroup[] = [
  { name: 'aws', hosts: ['2G-6C'] },
  { name: 'vps', hosts: ['us-2.5G-2C', '1H-2G', 'SH-2H-2G'] },
  { name: 'zgo', hosts: ['HK-1H1G-500G'] },
  { name: 'cloud', hosts: ['SG-2H2G-1T'] },
];

interface IHostTreeProps {
  activeHost?: string;
  groups?: IHostGroup[];
  highlightHost?: string;
}

export function HostTree({ activeHost, groups = DEFAULT_GROUPS, highlightHost }: IHostTreeProps) {
  return (
    <aside
      className="flex flex-col shrink-0"
      style={{
        width: 168,
        background: '#292b38',
        borderRight: '1px solid rgba(168,176,204,0.2)',
      }}
    >
      <div
        className="flex items-center shrink-0"
        style={{ height: 30, padding: '0 8px 0 10px', gap: 7 }}
      >
        <span style={{ fontSize: 11.5, fontWeight: 720, letterSpacing: -0.1, whiteSpace: 'nowrap' }}>
          Hosts Explorer
        </span>
        <div className="flex-1" />
        <HeaderActionIcon kind="plus" />
        <HeaderActionIcon kind="folder" />
        <HeaderActionIcon kind="refresh" />
      </div>

      <div className="flex-1 overflow-hidden" style={{ padding: '1px 8px 12px 5px' }}>
        {groups.map((group) => (
          <div key={group.name} style={{ marginBottom: 8 }}>
            <div
              className="flex items-center"
              style={{ height: 21, gap: 6, color: 'rgba(255,255,255,0.95)' }}
            >
              <ChevronRight
                strokeWidth={1.35}
                size={13}
                style={{ color: 'rgba(255,255,255,0.86)', flexShrink: 0, transform: 'rotate(90deg)' }}
              />
              <FolderOpen
                strokeWidth={1.25}
                size={15}
                style={{ color: 'rgba(255,255,255,0.9)', flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, fontWeight: 760, letterSpacing: -0.1 }}>{group.name}</span>
            </div>
            <div style={{ paddingLeft: 34, paddingTop: 1 }}>
              {group.hosts.map((host) => {
                const isActive = host === activeHost;
                const isHighlight = host === highlightHost;
                return (
                  <div
                    key={host}
                    className="flex items-center"
                    style={{
                      width: '100%',
                      height: 22,
                      gap: 7,
                      color: isHighlight
                        ? 'rgba(255,255,255,0.98)'
                        : isActive
                          ? 'rgba(255,255,255,0.98)'
                          : 'rgba(255,255,255,0.92)',
                      background: isHighlight ? 'rgba(174,188,255,0.14)' : 'transparent',
                      borderRadius: isHighlight ? 4 : 0,
                      paddingLeft: isHighlight ? 4 : 0,
                      marginLeft: isHighlight ? -4 : 0,
                    }}
                  >
                    <TerminalSquare
                      strokeWidth={1.25}
                      size={13}
                      style={{ color: isActive ? '#43ff89' : '#31ee7d', flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 720,
                        letterSpacing: -0.2,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {host}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function HeaderActionIcon({ kind }: { kind: 'plus' | 'folder' | 'refresh' }) {
  const iconStyle = { color: 'rgba(255,255,255,0.78)' };

  return (
    <span className="inline-flex items-center justify-center" style={{ width: 13, height: 13 }}>
      {kind === 'plus' && <CirclePlus strokeWidth={1.5} size={12} style={iconStyle} />}
      {kind === 'folder' && <FolderPlus strokeWidth={1.5} size={13} style={iconStyle} />}
      {kind === 'refresh' && <RotateCw strokeWidth={1.5} size={12} style={iconStyle} />}
    </span>
  );
}
