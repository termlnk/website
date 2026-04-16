import type { SettingsPanel } from './constants';
import type { INavItem } from './panel-meta';
import { ACCENT, LINE, SIDEBAR_BG } from './constants';
import { NAV_ITEMS } from './panel-meta';

interface INavSidebarProps {
  activeId: SettingsPanel;
  onSelect: (panel: SettingsPanel) => void;
}

export function NavSidebar({ activeId, onSelect }: INavSidebarProps) {
  return (
    <aside
      className="shrink-0"
      style={{
        width: 150,
        background: SIDEBAR_BG,
        borderRight: `1px solid ${LINE}`,
        paddingTop: 12,
      }}
    >
      {NAV_ITEMS.map((item) => (
        <NavItem key={item.id} item={item} active={item.id === activeId} onSelect={onSelect} />
      ))}
    </aside>
  );
}

function NavItem({ item, active, onSelect }: { item: INavItem; active: boolean; onSelect: (panel: SettingsPanel) => void }) {
  return (
    <button
      type="button"
      className="flex items-center"
      onClick={() => onSelect(item.id)}
      aria-current={active ? 'page' : undefined}
      style={{
        width: '100%',
        height: 34,
        padding: '0 12px',
        gap: 10,
        color: active ? ACCENT : 'rgba(255,255,255,0.88)',
        background: active ? 'rgba(174,188,255,0.16)' : 'transparent',
        border: 'none',
        borderRight: active ? `2px solid ${ACCENT}` : '2px solid transparent',
        fontSize: 12.5,
        fontWeight: 830,
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span style={{ width: 14, display: 'inline-flex', opacity: active ? 1 : 0.95 }}>{item.icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
    </button>
  );
}
