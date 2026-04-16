import type { INotchSize, NotchScene } from '@/sections/demo/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NOTCH_SCENE_ORDER } from '@/sections/demo/types';

const NOTCH_SIZES: Record<NotchScene, INotchSize> = {
  compact: { w: 260, h: 36, r: 13 },
  overview: { w: 380, h: 130, r: 14 },
  approval: { w: 380, h: 165, r: 14 },
  ask: { w: 340, h: 145, r: 14 },
  jump: { w: 380, h: 120, r: 14 },
  approved: { w: 260, h: 36, r: 13 },
};

const SCENE_DURATIONS: Record<string, number> = {
  overview: 5500,
  approval: 5600,
  ask: 4300,
  jump: 12800,
};

const SCENE_ORDER = NOTCH_SCENE_ORDER;

const SCENE_SHADOWS: Record<string, string> = {
  compact: '0 6px 18px rgba(0,0,0,0.52), 0 1px 0 rgba(255,255,255,0.05) inset',
  overview: '0 2px 8px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.04)',
  approval: '0 2px 8px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.3), 0 0 20px rgba(249,115,22,0.15)',
  ask: '0 2px 8px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.3), 0 0 20px rgba(6,182,212,0.15)',
  jump: '0 2px 8px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.04)',
  approved: '0 6px 18px rgba(0,0,0,0.52), 0 1px 0 rgba(255,255,255,0.05) inset',
};

const SCENE_TITLES: Record<string, string> = {
  overview: 'Every agent. One glance.',
  approval: 'Approve without switching apps.',
  ask: 'Make decisions from the notch.',
  jump: 'Jump back instantly.',
};

const SCENE_DESCS: Record<string, string> = {
  overview: 'Claude Code, Codex, Gemini CLI, and Cursor — all in a single view.',
  approval: 'Allow or deny permissions without leaving your flow.',
  ask: 'When an agent needs input, pick an option and keep moving.',
  jump: 'Return to the exact terminal, tab, or split pane in one click.',
};

export interface INotchState {
  scene: NotchScene;
  size: INotchSize;
  shadow: string;
  title: string;
  description: string;
  activeScene: NotchScene;
  duration: number;
}

interface IAction {
  fn: () => void;
  delay: number;
  act: number;
}

interface IUseNotchStateMachineOptions {
  manual?: boolean;
}

export function useNotchStateMachine(options: IUseNotchStateMachineOptions = {}) {
  const { manual = false } = options;
  const [state, setState] = useState<INotchState>({
    scene: 'compact',
    size: NOTCH_SIZES.compact,
    shadow: SCENE_SHADOWS.compact,
    title: SCENE_TITLES.overview,
    description: SCENE_DESCS.overview,
    activeScene: 'overview',
    duration: SCENE_DURATIONS.overview,
  });

  const queueRef = useRef<IAction[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const actRef = useRef(0);

  const setScene = useCallback((scene: NotchScene) => {
    const size = NOTCH_SIZES[scene];
    const shadow = SCENE_SHADOWS[scene] || SCENE_SHADOWS.compact;

    setState((prev) => {
      const displayScene = scene === 'compact' || scene === 'approved'
        ? prev.activeScene
        : scene;

      return {
        ...prev,
        scene,
        size,
        shadow,
        title: SCENE_TITLES[displayScene] || prev.title,
        description: SCENE_DESCS[displayScene] || prev.description,
        activeScene: SCENE_ORDER.includes(scene as any) ? scene : prev.activeScene,
        duration: SCENE_DURATIONS[displayScene] || prev.duration,
      };
    });
  }, []);

  const enqueue = useCallback((fn: () => void, delay: number, act = 0) => {
    queueRef.current.push({ fn, delay, act });
  }, []);

  const processQueue = useCallback(() => {
    if (queueRef.current.length === 0) return;
    const action = queueRef.current.shift()!;
    actRef.current = action.act;
    action.fn();
    timerRef.current = setTimeout(processQueue, action.delay);
  }, []);

  const buildTimeline = useCallback(() => {
    queueRef.current = [];

    // Overview
    enqueue(() => setScene('compact'), 2000, 1);
    enqueue(() => setScene('overview'), 1500, 1);

    // Approval
    enqueue(() => setScene('approval'), 5500, 2);
    enqueue(() => setScene('approved'), 3000, 2);

    // Ask
    enqueue(() => setScene('ask'), 2000, 3);
    enqueue(() => setScene('approved'), 3000, 3);

    // Jump
    enqueue(() => setScene('jump'), 2000, 4);
    enqueue(() => setScene('compact'), 4000, 4);
  }, [enqueue, setScene]);

  const pause = useCallback((resumeDelay = 5000) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    pauseTimerRef.current = setTimeout(() => {
      if (queueRef.current.length === 0) {
        buildTimeline();
      }
      processQueue();
    }, resumeDelay);
  }, [buildTimeline, processQueue]);

  const jumpToScene = useCallback((scene: NotchScene) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    const sceneIdx = SCENE_ORDER.indexOf(scene);
    if (sceneIdx === -1) return;

    const act = sceneIdx + 1;
    queueRef.current = queueRef.current.filter((a) => a.act > act);
    actRef.current = act;
    setScene(scene);
    pause(5000);
  }, [setScene, pause]);

  const handleNotchClick = useCallback(() => {
    if (state.scene === 'compact') {
      setScene('overview');
      if (!manual) pause();
    } else if (state.scene === 'overview') {
      setScene('compact');
      if (!manual) pause();
    }
  }, [manual, state.scene, setScene, pause]);

  const skipAct = useCallback((act: number, scene: NotchScene, resumeDelay = 2000) => {
    if (manual) {
      setScene(scene);
      return;
    }
    queueRef.current = queueRef.current.filter((a) => a.act > act);
    actRef.current = act;
    setScene(scene);
    pause(resumeDelay);
  }, [manual, setScene, pause]);

  const handleAllow = useCallback(() => skipAct(2, 'approved'), [skipAct]);
  const handleDeny = useCallback(() => skipAct(2, 'compact'), [skipAct]);
  const handleAskOption = useCallback(() => skipAct(3, 'approved'), [skipAct]);

  // Start timeline (skipped in manual mode — the parent drives scene changes)
  useEffect(() => {
    if (manual) return;

    const startTimer = setTimeout(() => {
      buildTimeline();
      processQueue();
    }, 1500);

    return () => {
      clearTimeout(startTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [manual, buildTimeline, processQueue]);

  return {
    state,
    setScene,
    jumpToScene,
    handleNotchClick,
    handleAllow,
    handleDeny,
    handleAskOption,
    sceneOrder: SCENE_ORDER,
  };
}
