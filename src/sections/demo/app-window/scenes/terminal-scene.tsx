import { HostTree } from '../parts/host-tree';

interface ITerminalSceneProps {
  active: boolean;
}

export function TerminalScene({ active: _active }: ITerminalSceneProps) {
  return (
    <div className="flex h-full" style={{ background: '#282936', color: 'rgba(255,255,255,0.92)' }}>
      <HostTree />
      <TerminalWorkspace />
    </div>
  );
}

function TerminalWorkspace() {
  return (
    <main className="relative flex-1 min-w-0" style={{ background: '#282936' }}>
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 11.5,
          fontWeight: 800,
          letterSpacing: -0.25,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ color: '#51f283' }}>➜</span>
        <span style={{ color: '#9eafe6' }}>~</span>
        <span
          style={{
            display: 'inline-block',
            width: 7,
            height: 13,
            border: '1px solid rgba(255,255,255,0.92)',
            animation: 'vi-pulse 1.25s ease-in-out infinite',
          }}
        />
      </div>
    </main>
  );
}
