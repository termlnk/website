import type { ReactNode } from 'react';
import type { SettingsPanel } from './constants';
import { Info, Keyboard, LayoutGrid, MessageSquare, Monitor, Network, Palette, Plug, Smartphone, Sparkles, Terminal, Wand2 } from 'lucide-react';

export interface INavItem {
  id: SettingsPanel;
  label: string;
  icon: ReactNode;
}

export const NAV_ITEMS: INavItem[] = [
  { id: 'appearance', label: 'Appearance', icon: <Monitor size={13} strokeWidth={1.8} /> },
  { id: 'interface', label: 'Interface', icon: <LayoutGrid size={13} strokeWidth={1.8} /> },
  { id: 'terminal', label: 'Terminal', icon: <Terminal size={13} strokeWidth={1.8} /> },
  { id: 'colorscheme', label: 'Color Scheme', icon: <Palette size={13} strokeWidth={1.8} /> },
  { id: 'network', label: 'Network', icon: <Network size={13} strokeWidth={1.8} /> },
  { id: 'mcp', label: 'MCP', icon: <Plug size={13} strokeWidth={1.8} /> },
  { id: 'provider', label: 'Provider', icon: <Sparkles size={13} strokeWidth={1.8} /> },
  { id: 'chat', label: 'Chat', icon: <MessageSquare size={13} strokeWidth={1.8} /> },
  { id: 'skills', label: 'Skills', icon: <Wand2 size={13} strokeWidth={1.8} /> },
  { id: 'island', label: 'Island', icon: <Smartphone size={13} strokeWidth={1.8} /> },
  { id: 'shortcuts', label: 'Shortcuts', icon: <Keyboard size={13} strokeWidth={1.8} /> },
  { id: 'about', label: 'About', icon: <Info size={13} strokeWidth={1.8} /> },
];

export const PANEL_META: Record<SettingsPanel, { title: string; desc: string; icon: ReactNode }> = {
  appearance: { title: 'Appearance', desc: 'Configure language settings', icon: <Monitor size={13} strokeWidth={1.8} /> },
  interface: { title: 'Interface', desc: 'Configure UI font family and size', icon: <LayoutGrid size={13} strokeWidth={1.8} /> },
  terminal: { title: 'Terminal', desc: 'Configure terminal font and session behavior', icon: <Terminal size={13} strokeWidth={1.8} /> },
  colorscheme: { title: 'Color Scheme', desc: 'Choose and apply theme color schemes', icon: <Palette size={13} strokeWidth={1.8} /> },
  network: { title: 'Network', desc: 'Manage proxy and network settings', icon: <Network size={13} strokeWidth={1.8} /> },
  mcp: { title: 'MCP', desc: 'Manage the built-in MCP server and external MCP connections', icon: <Plug size={13} strokeWidth={1.8} /> },
  provider: { title: 'Provider', desc: 'Configure providers and model selection', icon: <Sparkles size={13} strokeWidth={1.8} /> },
  chat: { title: 'Chat', desc: 'Chat behavior settings', icon: <MessageSquare size={13} strokeWidth={1.8} /> },
  skills: { title: 'Skills', desc: 'Manage AI skills and capabilities', icon: <Wand2 size={13} strokeWidth={1.8} /> },
  island: { title: 'Island', desc: 'Configure Dynamic Island notifications and sounds', icon: <Smartphone size={13} strokeWidth={1.8} /> },
  shortcuts: { title: 'Shortcuts', desc: 'Review registered keyboard shortcuts', icon: <Keyboard size={13} strokeWidth={1.8} /> },
  about: { title: 'About', desc: 'View app and runtime information', icon: <Info size={13} strokeWidth={1.8} /> },
};
