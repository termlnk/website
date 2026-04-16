import type { AppDemoScene } from '@/sections/demo/types';
import { BotMessageSquare, Settings2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface ISceneBarProps {
  sceneOrder: readonly AppDemoScene[];
  activeScene: AppDemoScene;
  duration: number;
  title: string;
  description: string;
  onSceneClick: (scene: AppDemoScene) => void;
}

const SCENE_META: Record<AppDemoScene, { label: string; color: string; borderActive: string; progressBg: string; labelFontSize?: number }> = {
  terminal: {
    label: 'Terminal',
    color: 'var(--color-idle)',
    borderActive: 'rgba(34,197,94,0.4)',
    progressBg: 'rgba(34,197,94,0.12)',
  },
  'ssh-sftp': {
    label: 'SSH & SFTP',
    color: 'var(--color-work)',
    borderActive: 'rgba(59,130,246,0.4)',
    progressBg: 'rgba(59,130,246,0.12)',
  },
  'ai-agent': {
    label: 'AI Agent',
    color: 'var(--color-question)',
    borderActive: 'rgba(6,182,212,0.4)',
    progressBg: 'rgba(6,182,212,0.12)',
    labelFontSize: 11,
  },
  settings: {
    label: 'Settings',
    color: 'var(--color-explore)',
    borderActive: 'rgba(168,85,247,0.4)',
    progressBg: 'rgba(168,85,247,0.12)',
  },
};

const SCENE_ICONS: Record<AppDemoScene, React.ReactNode> = {
  terminal: (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <rect x={2} y={2} width={2} height={2} fill="currentColor" />
      <rect x={4} y={4} width={2} height={2} fill="currentColor" />
      <rect x={6} y={6} width={2} height={2} fill="currentColor" />
      <rect x={4} y={8} width={2} height={2} fill="currentColor" />
      <rect x={2} y={10} width={2} height={2} fill="currentColor" />
      <rect x={8} y={10} width={6} height={2} fill="currentColor" />
    </svg>
  ),
  'ssh-sftp': (
    <svg width={12} height={12} viewBox="0 0 16 16" fill="none" shapeRendering="crispEdges">
      <rect x={1} y={2} width={6} height={2} fill="currentColor" />
      <rect x={1} y={4} width={2} height={8} fill="currentColor" />
      <rect x={5} y={4} width={2} height={8} fill="currentColor" />
      <rect x={1} y={12} width={6} height={2} fill="currentColor" />
      <rect x={9} y={2} width={6} height={2} fill="currentColor" />
      <rect x={9} y={4} width={2} height={8} fill="currentColor" />
      <rect x={13} y={4} width={2} height={8} fill="currentColor" />
      <rect x={9} y={12} width={6} height={2} fill="currentColor" />
    </svg>
  ),
  'ai-agent': (
    <BotMessageSquare size={12} strokeWidth={1.8} />
  ),
  settings: (
    <Settings2 size={12} strokeWidth={1.8} />
  ),
};

export function SceneBar({ sceneOrder, activeScene, duration, title, description, onSceneClick }: ISceneBarProps) {
  const activeIdx = sceneOrder.indexOf(activeScene);

  return (
    <div
      className="relative mt-[18px] flex flex-col items-center gap-3.5 max-md:hidden"
      style={{ zIndex: 210 }}
    >
      <div className="flex gap-1">
        {sceneOrder.map((scene, i) => {
          const isActive = scene === activeScene;
          const isDone = i < activeIdx;
          const meta = SCENE_META[scene];
          return (
            <ScenePill
              key={scene}
              label={meta.label}
              icon={SCENE_ICONS[scene]}
              isActive={isActive}
              isDone={isDone}
              color={meta.color}
              borderActive={meta.borderActive}
              progressBg={meta.progressBg}
              fontSize={meta.labelFontSize}
              duration={duration}
              onClick={() => onSceneClick(scene)}
            />
          );
        })}
      </div>

      <div className="flex min-h-[114px] flex-col items-center">
        <div className="text-center font-bold" style={{ fontSize: 28, color: 'var(--color-text)' }}>
          {title}
        </div>
        <div
          className="mt-3 text-center"
          style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.6 }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

interface IScenePillProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  isDone: boolean;
  color: string;
  borderActive: string;
  progressBg: string;
  fontSize?: number;
  duration: number;
  onClick: () => void;
}

function ScenePill({ label, icon, isActive, isDone, color, borderActive, progressBg, fontSize = 12, duration, onClick }: IScenePillProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;

    if (isActive) {
      el.style.transform = 'scaleX(0)';
      el.style.background = progressBg;
      void el.offsetWidth;
      el.style.transition = `transform ${duration}ms linear`;
      el.style.transform = 'scaleX(1)';
    } else if (isDone) {
      el.style.transition = 'none';
      el.style.transform = 'scaleX(1)';
      el.style.background = 'rgba(255,255,255,0.04)';
    } else {
      el.style.transition = 'none';
      el.style.transform = 'scaleX(0)';
    }
  }, [isActive, isDone, duration, progressBg]);

  return (
    <button
      className="relative inline-flex items-center gap-1.5 cursor-pointer overflow-hidden"
      onClick={onClick}
      style={{
        padding: '7px 18px',
        border: `1px solid ${isActive ? borderActive : isDone ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: 8,
        background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
        fontSize,
        fontWeight: 500,
        fontFamily: '"JetBrains Mono", monospace',
        letterSpacing: '0.04em',
        transition: 'color 0.2s, border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
          e.currentTarget.style.borderColor = isDone ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.15)';
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      <div
        ref={progressRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transformOrigin: 'left center', transform: 'scaleX(0)' }}
      />
      <span
        className="relative shrink-0"
        style={{
          opacity: isActive ? 1 : 0.5,
          color: isActive ? color : undefined,
          transition: 'opacity 0.2s, color 0.2s',
        }}
      >
        {icon}
      </span>
      <span className="relative">{label}</span>
    </button>
  );
}
