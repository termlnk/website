export type SettingsPanel =
  | 'about'
  | 'appearance'
  | 'chat'
  | 'colorscheme'
  | 'interface'
  | 'island'
  | 'mcp'
  | 'network'
  | 'provider'
  | 'shortcuts'
  | 'skills'
  | 'terminal';

export const PANEL_ORDER: readonly SettingsPanel[] = [
  'appearance',
  'interface',
  'terminal',
  'colorscheme',
  'network',
  'mcp',
  'provider',
  'chat',
  'skills',
  'island',
  'shortcuts',
  'about',
] as const;

export const PANEL_DURATIONS = [2600, 2600, 2800, 3900, 2800, 2800, 4500, 2800, 3600, 3400, 2600, 3200] as const;

export const SHELL_BG = '#242633';
export const MODAL_BG = '#343542';
export const CONTENT_BG = '#292b38';
export const SIDEBAR_BG = '#2c2e3b';
export const CARD_BG = '#343542';
export const INPUT_BG = '#252735';
export const LINE = 'rgba(168,176,204,0.14)';
export const LINE_STRONG = 'rgba(192,198,220,0.24)';
export const TEXT = 'rgba(255,255,255,0.93)';
export const MUTED = 'rgba(214,218,232,0.48)';
export const FAINT = 'rgba(214,218,232,0.32)';
export const ACCENT = '#aebcff';
