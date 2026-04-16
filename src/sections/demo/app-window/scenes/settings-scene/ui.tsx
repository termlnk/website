import type { ReactNode } from 'react';
import type { SettingsPanel } from './constants';
import { ChevronDown, EyeOff, Play, Search } from 'lucide-react';
import { ACCENT, CARD_BG, FAINT, INPUT_BG, LINE, LINE_STRONG, MUTED, TEXT } from './constants';
import { PANEL_META } from './panel-meta';

export function PanelFrame({ panel, children }: { panel: SettingsPanel; children: ReactNode }) {
  const meta = PANEL_META[panel];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div style={{ height: 56, padding: '13px 22px', borderBottom: `1px solid ${LINE}` }}>
        <div className="flex items-center" style={{ gap: 9, fontSize: 14, fontWeight: 880 }}>
          <span style={{ color: ACCENT, display: 'inline-flex' }}>{meta.icon}</span>
          {meta.title}
        </div>
        <div style={{ marginTop: 4, fontSize: 10.5, color: MUTED, fontWeight: 560 }}>{meta.desc}</div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden" style={{ padding: 18 }}>
        {children}
      </div>
    </div>
  );
}

export function Section({ title, desc, icon, children, tight = false }: { title?: string; desc?: string; icon?: ReactNode; children: ReactNode; tight?: boolean }) {
  return (
    <section
      style={{
        marginBottom: 16,
        borderRadius: 10,
        border: `1px solid ${LINE}`,
        background: CARD_BG,
        overflow: 'hidden',
      }}
    >
      {(title || desc) && (
        <div style={{ padding: tight ? '9px 14px' : '13px 16px', borderBottom: `1px solid ${LINE}` }}>
          <div className="flex items-center" style={{ gap: 9 }}>
            {icon && <span style={{ color: FAINT, display: 'inline-flex' }}>{icon}</span>}
            {title && <div style={{ fontSize: 12.5, fontWeight: 850 }}>{title}</div>}
          </div>
          {desc && <div style={{ marginTop: 8, fontSize: 10, color: MUTED }}>{desc}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Toggle({ on }: { on: boolean }) {
  return (
    <div
      style={{
        width: 28,
        height: 17,
        borderRadius: 999,
        background: on ? 'rgba(174,188,255,0.9)' : 'rgba(91,96,119,0.62)',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 1.5,
          left: on ? 12.5 : 1.5,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.28)',
        }}
      />
    </div>
  );
}

export function Row({ label, desc, control, last = false }: { label: string; desc?: string; control: ReactNode; last?: boolean }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        minHeight: 55,
        padding: '11px 16px',
        gap: 18,
        borderBottom: last ? 'none' : `1px solid ${LINE}`,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11.5, color: TEXT, fontWeight: 760 }}>{label}</div>
        {desc && <div style={{ marginTop: 5, fontSize: 10, color: MUTED, lineHeight: 1.25 }}>{desc}</div>}
      </div>
      {control}
    </div>
  );
}

export function SelectBox({ value, width = 142 }: { value: string; width?: number }) {
  return (
    <button
      type="button"
      className="flex items-center justify-between"
      style={{
        width,
        minWidth: width,
        height: 32,
        padding: '0 9px',
        borderRadius: 6,
        border: `1px solid ${LINE_STRONG}`,
        background: INPUT_BG,
        color: TEXT,
        fontSize: 11.5,
        fontWeight: 720,
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
      <ChevronDown size={14} strokeWidth={1.8} style={{ color: FAINT, flexShrink: 0 }} />
    </button>
  );
}

export function InputBox({ value, width, secret = false, placeholder }: { value?: string; width?: number; secret?: boolean; placeholder?: string }) {
  return (
    <div
      className="flex items-center"
      style={{
        width,
        height: 28,
        padding: '0 9px',
        borderRadius: 5,
        border: '1px solid rgba(0,0,0,0.12)',
        background: INPUT_BG,
        color: value ? TEXT : FAINT,
        fontSize: 10.5,
        fontWeight: 680,
        minWidth: 0,
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
        {secret ? '••••••••••••••••••••••••••••••••••••••••' : value || placeholder}
      </span>
      {secret && <EyeOff size={13} strokeWidth={1.7} style={{ color: 'rgba(255,255,255,0.72)' }} />}
    </div>
  );
}

export function Button({ children, variant = 'dark' }: { children: ReactNode; variant?: 'accent' | 'dark' | 'ghost' }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center"
      style={{
        height: 27,
        padding: '0 11px',
        gap: 6,
        borderRadius: 5,
        border: `1px solid ${variant === 'accent' ? 'rgba(174,188,255,0.38)' : 'rgba(255,255,255,0.08)'}`,
        background: variant === 'accent' ? 'rgba(174,188,255,0.92)' : variant === 'ghost' ? 'transparent' : INPUT_BG,
        color: variant === 'accent' ? '#fff' : TEXT,
        fontSize: 10.5,
        fontWeight: 800,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export function Field({ label, value, placeholder, secret }: { label: string; value?: string; placeholder?: string; secret?: boolean }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ marginBottom: 8, fontSize: 10.5, fontWeight: 760 }}>{label}</div>
      <InputBox value={value} placeholder={placeholder} secret={secret} />
    </label>
  );
}

export function Tab({ label, count, active = false, icon }: { label: string; count: string; active?: boolean; icon?: ReactNode }) {
  return (
    <button
      type="button"
      className="flex items-center"
      style={{
        height: 28,
        padding: '0 10px',
        gap: 7,
        borderRadius: 6,
        border: 'none',
        background: active ? 'rgba(174,188,255,0.14)' : 'transparent',
        color: active ? ACCENT : TEXT,
        fontSize: 10.5,
        fontWeight: 820,
      }}
    >
      {icon}
      {label}
      <span
        style={{
          minWidth: 16,
          height: 16,
          padding: '0 5px',
          borderRadius: 999,
          background: active ? 'rgba(174,188,255,0.18)' : 'rgba(174,188,255,0.1)',
          color: active ? ACCENT : 'rgba(255,255,255,0.56)',
          lineHeight: '16px',
        }}
      >
        {count}
      </span>
    </button>
  );
}

export function Slider({ value, width }: { value: number; width?: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: width || '100%',
        height: 4,
        borderRadius: 999,
        background: 'rgba(174,188,255,0.18)',
        flexShrink: 0,
      }}
    >
      <span style={{ display: 'block', width: `${value}%`, height: '100%', borderRadius: 999, background: ACCENT }} />
      <span
        style={{
          position: 'absolute',
          left: `calc(${value}% - 6px)`,
          top: -5,
          width: 13,
          height: 13,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 5px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}

export function SubGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ margin: '0 0 8px 14px', color: FAINT, fontSize: 10, fontWeight: 850 }}>{label}</div>
      <Section tight>{children}</Section>
    </div>
  );
}

export function SoundRow({ title, desc, last = false }: { title: string; desc: string; last?: boolean }) {
  return (
    <Row
      label={title}
      desc={desc}
      control={(
        <div className="flex items-center" style={{ gap: 12 }}>
          <Play size={13} strokeWidth={1.8} style={{ color: FAINT }} />
          <Toggle on />
        </div>
      )}
      last={last}
    />
  );
}

export function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 26,
        padding: '0 8px',
        gap: 7,
        borderRadius: 5,
        background: INPUT_BG,
        border: '1px solid rgba(0,0,0,0.14)',
        color: FAINT,
        fontSize: 10,
        fontWeight: 650,
      }}
    >
      <Search size={12} strokeWidth={1.8} />
      {placeholder}
    </div>
  );
}

export function LabelLine({ label }: { label: string }) {
  return <div style={{ marginBottom: 9, fontSize: 10.5, fontWeight: 800 }}>{label}</div>;
}
