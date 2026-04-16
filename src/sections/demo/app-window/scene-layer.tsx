import type { ReactNode } from 'react';

interface ISceneLayerProps {
  active: boolean;
  children: ReactNode;
}

export function SceneLayer({ active, children }: ISceneLayerProps) {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: active ? 1 : 0,
        filter: active ? 'blur(0px)' : 'blur(4px)',
        transform: active ? 'scale(1)' : 'scale(0.98)',
        transition: [
          'opacity 0.3s ease',
          'filter 0.35s ease',
          'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
        ].join(', '),
        transitionDelay: active ? '0.06s' : '0s',
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  );
}
