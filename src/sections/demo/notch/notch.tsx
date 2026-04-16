import type { ReactNode } from 'react';
import type { INotchSize, NotchScene } from '@/sections/demo/types';

interface INotchProps {
  scene: NotchScene;
  size: INotchSize;
  shadow: string;
  onClick: () => void;
  children: ReactNode;
}

export function Notch({ scene, size, shadow, onClick, children }: INotchProps) {
  return (
    <div
      className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none"
      style={{ zIndex: 20 }}
    >
      <div
        className="relative overflow-visible pointer-events-auto cursor-pointer"
        onClick={onClick}
        style={{
          background: '#000',
          width: size.w,
          height: size.h,
          borderRadius: scene === 'compact' ? `0 0 ${size.r}px ${size.r}px` : `0 0 ${size.r}px ${size.r}px`,
          boxShadow: shadow,
          transition: 'width 0.5s cubic-bezier(0.175,0.885,0.32,1.1), height 0.5s cubic-bezier(0.175,0.885,0.32,1.1)',
          marginTop: scene === 'compact' ? 0 : undefined,
        }}
      >
        {/* Notch ears */}
        <div
          className="absolute top-0 pointer-events-none"
          style={{
            left: scene === 'compact' ? -15 : -13,
            width: scene === 'compact' ? 15 : 13,
            height: scene === 'compact' ? 28 : 25,
            borderTopRightRadius: scene === 'compact' ? 9 : 6,
            boxShadow: scene === 'compact' ? '#000 6px 0' : '#000 5px 0',
          }}
        />
        <div
          className="absolute top-0 pointer-events-none"
          style={{
            right: scene === 'compact' ? -15 : -13,
            width: scene === 'compact' ? 15 : 13,
            height: scene === 'compact' ? 28 : 25,
            borderTopLeftRadius: scene === 'compact' ? 9 : 6,
            boxShadow: scene === 'compact' ? '#000 -6px 0' : '#000 -5px 0',
          }}
        />

        {children}
      </div>
    </div>
  );
}

interface INotchLayerProps {
  active: boolean;
  children: ReactNode;
  className?: string;
}

export function NotchLayer({ active, children, className }: INotchLayerProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className || ''}`}
      style={{
        opacity: active ? 1 : 0,
        filter: active ? 'blur(0)' : 'blur(6px)',
        transform: active ? 'scale(1)' : 'scale(0.96)',
        transition: 'opacity .25s, filter .3s, transform .35s cubic-bezier(0.175,0.885,0.32,1.1)',
        transitionDelay: active ? '0.06s' : '0s',
        pointerEvents: active ? 'auto' : 'none',
        padding: '0 14px',
        overflow: 'hidden',
        borderRadius: 'inherit',
      }}
    >
      {children}
    </div>
  );
}
