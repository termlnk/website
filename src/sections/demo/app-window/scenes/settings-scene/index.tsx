import type { SettingsPanel } from './constants';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSceneSubstate } from '@/hooks/use-scene-substate';
import { CONTENT_BG, LINE, MODAL_BG, PANEL_DURATIONS, PANEL_ORDER, SHELL_BG, TEXT } from './constants';
import { NavSidebar } from './nav-sidebar';
import { AboutPanel } from './panels/about-panel';
import { AppearancePanel } from './panels/appearance-panel';
import { ChatPanel } from './panels/chat-panel';
import { ColorSchemePanel } from './panels/color-scheme-panel';
import { InterfacePanel } from './panels/interface-panel';
import { IslandPanel } from './panels/island-panel';
import { McpPanel } from './panels/mcp-panel';
import { NetworkPanel } from './panels/network-panel';
import { ProviderPanel } from './panels/provider-panel';
import { ShortcutsPanel } from './panels/shortcuts-panel';
import { SkillsPanel } from './panels/skills-panel';
import { TerminalPanel } from './panels/terminal-panel';

interface ISettingsSceneProps {
  active: boolean;
}

export function SettingsScene({ active }: ISettingsSceneProps) {
  const { step } = useSceneSubstate({
    active,
    steps: PANEL_ORDER,
    durations: PANEL_DURATIONS,
  });
  const [selectedPanel, setSelectedPanel] = useState<SettingsPanel>('appearance');
  const [userSelectedPanel, setUserSelectedPanel] = useState(false);

  useEffect(() => {
    if (!active) {
      setUserSelectedPanel(false);
      return;
    }
    if (!userSelectedPanel) {
      setSelectedPanel(step);
    }
  }, [active, step, userSelectedPanel]);

  const handlePanelSelect = (panel: SettingsPanel) => {
    setUserSelectedPanel(true);
    setSelectedPanel(panel);
  };

  return (
    <div className="relative h-full" style={{ background: SHELL_BG, color: TEXT }}>
      <div
        className="absolute flex flex-col"
        style={{
          inset: '56px 42px 28px',
          minWidth: 0,
          background: MODAL_BG,
          borderRadius: 9,
          border: '1.2px solid rgba(255,255,255,0.72)',
          overflow: 'hidden',
          boxShadow: '0 18px 48px rgba(0,0,0,0.34)',
        }}
      >
        <div
          className="flex items-center justify-between shrink-0"
          style={{ height: 50, padding: '0 16px', background: MODAL_BG }}
        >
          <span style={{ fontSize: 15, fontWeight: 860, color: 'rgba(255,255,255,0.96)' }}>Settings</span>
          <X size={15} strokeWidth={2} style={{ color: 'rgba(255,255,255,0.62)' }} />
        </div>

        <div className="flex min-h-0 flex-1" style={{ margin: '0 16px 14px', borderRadius: 8, overflow: 'hidden' }}>
          <NavSidebar activeId={selectedPanel} onSelect={handlePanelSelect} />
          <div className="min-w-0 flex-1" style={{ background: CONTENT_BG, borderLeft: `1px solid ${LINE}` }}>
            <PanelContent panel={selectedPanel} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelContent({ panel }: { panel: SettingsPanel }) {
  switch (panel) {
    case 'appearance': return <AppearancePanel />;
    case 'interface': return <InterfacePanel />;
    case 'terminal': return <TerminalPanel />;
    case 'colorscheme': return <ColorSchemePanel />;
    case 'network': return <NetworkPanel />;
    case 'mcp': return <McpPanel />;
    case 'provider': return <ProviderPanel selected="OpenAI" />;
    case 'chat': return <ChatPanel />;
    case 'skills': return <SkillsPanel />;
    case 'island': return <IslandPanel />;
    case 'shortcuts': return <ShortcutsPanel />;
    case 'about': return <AboutPanel />;
  }
}
