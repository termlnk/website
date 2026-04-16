import type { TFunction } from 'i18next';
import type { AppDemoScene, NotchScene } from '@/sections/demo/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_DEMO_SCENE_ORDER } from '@/sections/demo/types';
import { useNotchStateMachine } from './use-notch-state-machine';

const SCENE_ORDER = APP_DEMO_SCENE_ORDER;
const CYCLE_DURATION = 8000;
const PAUSE_DURATION = 10000;
const TERMINAL_NOTCH_EXPAND_DELAY = CYCLE_DURATION / 2;
const TERMINAL_NOTCH_COLLAPSE_DURATION = 500;

const SCENE_KEYS: Record<AppDemoScene, 'terminal' | 'sshSftp' | 'aiAgent' | 'settings'> = {
  terminal: 'terminal',
  'ssh-sftp': 'sshSftp',
  'ai-agent': 'aiAgent',
  settings: 'settings',
};

function getSceneMeta(scene: AppDemoScene, t: TFunction<'common'>) {
  const key = SCENE_KEYS[scene];
  return {
    title: t(`demo.${key}.title`),
    description: t(`demo.${key}.description`),
  };
}

interface INotchStep { scene: NotchScene; duration: number }

const NOTCH_SUBSEQUENCE: Record<AppDemoScene, INotchStep[]> = {
  terminal: [
    { scene: 'compact', duration: TERMINAL_NOTCH_EXPAND_DELAY },
    { scene: 'overview', duration: CYCLE_DURATION - TERMINAL_NOTCH_EXPAND_DELAY - TERMINAL_NOTCH_COLLAPSE_DURATION },
    { scene: 'compact', duration: TERMINAL_NOTCH_COLLAPSE_DURATION },
  ],
  'ssh-sftp': [
    { scene: 'compact', duration: 500 },
    { scene: 'approval', duration: 5000 },
    { scene: 'approved', duration: 2000 },
    { scene: 'compact', duration: 500 },
  ],
  'ai-agent': [
    { scene: 'compact', duration: 500 },
    { scene: 'ask', duration: 5000 },
    { scene: 'approved', duration: 2000 },
    { scene: 'compact', duration: 500 },
  ],
  settings: [
    { scene: 'compact', duration: CYCLE_DURATION },
  ],
};

export interface IAppDemoState {
  activeScene: AppDemoScene;
  title: string;
  description: string;
  duration: number;
}

export function useSyncedDemoState() {
  const { t } = useTranslation();
  const notch = useNotchStateMachine({ manual: true });
  const [activeScene, setActiveScene] = useState<AppDemoScene>('terminal');

  const mainTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notchTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const notchSetSceneRef = useRef(notch.setScene);
  notchSetSceneRef.current = notch.setScene;

  const playCycleRef = useRef<(scene: AppDemoScene, skipFirstCompact?: boolean, scheduleNext?: boolean) => void>(() => {});

  const clearNotchTimers = useCallback(() => {
    for (const t of notchTimersRef.current) clearTimeout(t);
    notchTimersRef.current = [];
  }, []);

  const clearMainTimer = useCallback(() => {
    if (mainTimerRef.current) {
      clearTimeout(mainTimerRef.current);
      mainTimerRef.current = null;
    }
  }, []);

  const clearPauseTimer = useCallback(() => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  const playCycle = useCallback((scene: AppDemoScene, skipFirstCompact = false, scheduleNext = true) => {
    clearNotchTimers();
    clearMainTimer();
    setActiveScene(scene);

    const steps = NOTCH_SUBSEQUENCE[scene];
    const startIdx = skipFirstCompact && steps.length > 1 ? 1 : 0;
    notchSetSceneRef.current(steps[startIdx].scene);

    let acc = 0;
    for (let i = startIdx + 1; i < steps.length; i++) {
      acc += steps[i - 1].duration;
      const target = steps[i].scene;
      notchTimersRef.current.push(setTimeout(() => notchSetSceneRef.current(target), acc));
    }

    if (scheduleNext) {
      const idx = SCENE_ORDER.indexOf(scene);
      const next = SCENE_ORDER[(idx + 1) % SCENE_ORDER.length];
      mainTimerRef.current = setTimeout(() => {
        playCycleRef.current(next, false, true);
      }, CYCLE_DURATION);
    }
  }, [clearNotchTimers, clearMainTimer]);

  playCycleRef.current = playCycle;

  const jumpTo = useCallback((scene: AppDemoScene) => {
    clearNotchTimers();
    clearMainTimer();
    clearPauseTimer();
    playCycleRef.current(scene, scene !== 'terminal', false);
    const idx = SCENE_ORDER.indexOf(scene);
    const next = SCENE_ORDER[(idx + 1) % SCENE_ORDER.length];
    pauseTimerRef.current = setTimeout(() => {
      playCycleRef.current(next, false, true);
    }, PAUSE_DURATION);
  }, [clearNotchTimers, clearMainTimer, clearPauseTimer]);

  useEffect(() => {
    playCycleRef.current('terminal', false, true);
    return () => {
      clearNotchTimers();
      clearMainTimer();
      clearPauseTimer();
    };
  }, [clearNotchTimers, clearMainTimer, clearPauseTimer]);

  const meta = getSceneMeta(activeScene, t);

  return {
    notchState: notch.state,
    handleNotchClick: notch.handleNotchClick,
    handleAllow: notch.handleAllow,
    handleDeny: notch.handleDeny,
    handleAskOption: notch.handleAskOption,
    appState: {
      activeScene,
      title: meta.title,
      description: meta.description,
      duration: CYCLE_DURATION,
    } satisfies IAppDemoState,
    jumpTo,
    sceneOrder: SCENE_ORDER,
  };
}
