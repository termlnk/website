import type { ReactNode } from 'react';

interface IMacbookFrameProps {
  children: ReactNode;
}

export function MacbookFrame({ children }: IMacbookFrameProps) {
  return (
    <div
      className="relative w-full [mask-image:linear-gradient(to_bottom,#000_0%,#000_58%,rgba(0,0,0,0.92)_68%,rgba(0,0,0,0.68)_78%,rgba(0,0,0,0.34)_90%,transparent_100%)]"
      style={{ maxWidth: 1060, zIndex: 110 }}
    >
      {/* Frame */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: '16 / 10',
          background: '#0a0a0a',
          borderRadius: '20px 20px 0 0',
          padding: 12,
          borderTop: '1px solid rgba(255,255,255,0.14)',
          borderRight: '1px solid rgba(255,255,255,0.14)',
          borderLeft: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        {/* Screen */}
        <div
          className="absolute overflow-hidden"
          style={{ inset: 12, borderRadius: '8px 8px 0 0' }}
        >
          {/* Wallpaper — macOS Sequoia style radial rays */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 0,
              background: [
                'radial-gradient(ellipse 120% 80% at 50% 120%, #d4764e 0%, transparent 60%)',
                'radial-gradient(ellipse 100% 100% at 30% 110%, #c85a3a 0%, transparent 50%)',
                'radial-gradient(ellipse 100% 100% at 70% 110%, #e08a55 0%, transparent 50%)',
                'radial-gradient(ellipse 80% 120% at 20% 90%, #4a7dd4 0%, transparent 55%)',
                'radial-gradient(ellipse 80% 120% at 80% 90%, #3b6bc4 0%, transparent 55%)',
                'radial-gradient(ellipse 120% 90% at 50% 80%, #2d5ab8 0%, transparent 50%)',
                'radial-gradient(ellipse 150% 100% at 50% 60%, #1e4a9e 0%, transparent 60%)',
                'linear-gradient(180deg, #0c1a3d 0%, #1a3a7a 30%, #2d5ab8 50%, #c07040 80%, #d4764e 100%)',
              ].join(', '),
            }}
          />
          {/* Conic ray overlay for the sunburst effect */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 0,
              background: 'conic-gradient(from 180deg at 50% 120%, #1a3a7a 0deg, #3b6bc4 20deg, #1e4a9e 40deg, #4a7dd4 55deg, #2d5ab8 70deg, #5a8ee0 85deg, #3570c0 100deg, #1a3a7a 120deg, #4a7dd4 140deg, #2050a0 160deg, #c07040 175deg, #d4764e 185deg, #c85a3a 195deg, #2050a0 210deg, #3b6bc4 230deg, #1a3a7a 250deg, #4a7dd4 270deg, #2d5ab8 290deg, #5a8ee0 310deg, #3570c0 330deg, #1a3a7a 360deg)',
              opacity: 0.6,
              mixBlendMode: 'screen',
            }}
          />

          {/* Menu bar */}
          <div
            className="relative flex justify-between items-center"
            style={{
              zIndex: 10,
              height: 28,
              padding: '0 14px',
              fontSize: 11,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <div className="flex gap-3.5 items-center">
              <span style={{ fontSize: 13, opacity: 0.8 }} />
              <span className="font-semibold">Termlnk</span>
              <span>File</span>
              <span>Edit</span>
              <span>Window</span>
              <span>Help</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Clock />
            </div>
          </div>

          {children}
        </div>
      </div>

    </div>
  );
}

function Clock() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;

  return (
    <span>
      {days[now.getDay()]}
      {' '}
      {h12}
      :
      {m}
      {' '}
      {ampm}
    </span>
  );
}
