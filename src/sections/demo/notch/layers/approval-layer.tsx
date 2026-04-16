import { NotchLayer } from '../notch';

interface IApprovalLayerProps {
  active: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

export function ApprovalLayer({ active, onAllow, onDeny }: IApprovalLayerProps) {
  return (
    <NotchLayer active={active} className="flex-col items-stretch! justify-start! gap-0 p-2!">
      {/* Header */}
      <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
        <div
          className="rounded-full shrink-0"
          style={{
            width: 6,
            height: 6,
            background: 'var(--color-alert)',
            animation: 'vi-pulse 1.5s ease infinite',
          }}
        />
        <span>Permission Request</span>
      </div>

      {/* Tool info */}
      <div className="flex items-center gap-1.5">
        <span style={{ fontSize: 11, color: 'var(--color-alert)' }}>&#9888;</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--color-alert)',
          }}
        >
          Edit
        </span>
        <span
          className="truncate"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          src/config/loader.ts
        </span>
      </div>

      {/* Diff */}
      <div
        className="rounded"
        style={{
          fontFamily: 'var(--font-mono)',
          background: 'rgba(255,255,255,0.04)',
          padding: '3px 0',
          marginBottom: 3,
          maxHeight: 68,
          overflow: 'hidden',
          fontSize: 9,
        }}
      >
        <DiffLine ln="12" type="ctx">{'const loadConfig = (key) =>'}</DiffLine>
        <DiffLine ln="13" type="del">- return config[key];</DiffLine>
        <DiffLine ln="13" type="add">+ if (!config[key]) throw new</DiffLine>
        <DiffLine ln="14" type="add">{"+ \u00A0\u00A0ConfigError('missing');"}</DiffLine>
        <DiffLine ln="15" type="add">+ return config[key];</DiffLine>
      </div>

      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>+3 -1</div>

      {/* Buttons */}
      <div className="flex gap-1.5 mt-auto pt-1">
        <button
          className="flex-1 border-none cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDeny();
          }}
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 500,
            background: 'rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Deny
          {' '}
          <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 8, opacity: 0.5 }}>&#8984;N</kbd>
        </button>
        <button
          className="flex-1 border-none cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onAllow();
          }}
          style={{
            padding: '5px 12px',
            borderRadius: 6,
            fontSize: 10,
            fontWeight: 500,
            background: 'rgba(255,255,255,0.9)',
            color: '#000',
          }}
        >
          Allow
          {' '}
          <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 8, opacity: 0.5 }}>&#8984;Y</kbd>
        </button>
      </div>
    </NotchLayer>
  );
}

function DiffLine({ ln, type, children }: { ln: string; type: 'ctx' | 'add' | 'del'; children: React.ReactNode }) {
  const styles: Record<string, React.CSSProperties> = {
    ctx: { color: 'rgba(255,255,255,0.35)' },
    add: { color: 'var(--color-idle)', background: 'rgba(34,197,94,0.08)' },
    del: { color: 'rgb(252,165,165)', background: 'rgba(249,115,22,0.08)' },
  };

  return (
    <div
      className="flex items-baseline gap-1"
      style={{
        padding: '0 6px',
        lineHeight: 1.6,
        whiteSpace: 'nowrap',
        ...styles[type],
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.2)', minWidth: 14, textAlign: 'right' }}>{ln}</span>
      {children}
    </div>
  );
}
