export type AppDemoScene = 'terminal' | 'ssh-sftp' | 'ai-agent' | 'settings';

export type NotchScene = 'compact' | 'overview' | 'approval' | 'ask' | 'jump' | 'approved';

export interface INotchSize {
  w: number;
  h: number;
  r: number;
}

export const APP_DEMO_SCENE_ORDER: readonly AppDemoScene[] = [
  'terminal',
  'ssh-sftp',
  'ai-agent',
  'settings',
] as const;

export const NOTCH_SCENE_ORDER: readonly NotchScene[] = [
  'overview',
  'approval',
  'ask',
  'jump',
] as const;
