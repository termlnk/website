import type { ReactNode } from 'react';
import { Check, Loader2, Terminal, XCircle } from 'lucide-react';
import { Fragment } from 'react';

export type ConnectionStep = 'connect' | 'verify' | 'shell';
export type StepState = 'pending' | 'active' | 'done' | 'failed';

interface IConnectionProgressProps {
  hostName: string;
  hostAddress: string;
  /** Current state of each step */
  steps: Record<ConnectionStep, StepState>;
  message?: ReactNode;
  messageTone?: 'info' | 'error' | 'success';
}

const STEP_ORDER: ConnectionStep[] = ['connect', 'verify', 'shell'];
const STEP_LABEL: Record<ConnectionStep, string> = {
  connect: 'Connect',
  verify: 'Verify',
  shell: 'Shell',
};

const TONE_COLORS = {
  info: '#a8b3ff',
  error: '#ff6b6b',
  success: '#4ade80',
} as const;

export function ConnectionProgress({
  hostName,
  hostAddress,
  steps,
  message,
  messageTone = 'info',
}: IConnectionProgressProps) {
  return (
    <div
      style={{
        width: 380,
        background: '#2d2e3c',
        border: '1px solid rgba(163,169,194,0.18)',
        borderRadius: 8,
        padding: 16,
      }}
    >
      <div className="flex items-start" style={{ marginBottom: 18 }}>
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 15, fontWeight: 850, color: 'rgba(255,255,255,0.95)' }}>{hostName}</div>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
            SSH
            {' '}
            {hostAddress}
          </div>
        </div>
        <button
          type="button"
          className="cursor-pointer"
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.5)',
            background: 'transparent',
            border: 'none',
          }}
        >
          Close
        </button>
      </div>

      <div className="flex items-center" style={{ gap: 4 }}>
        {STEP_ORDER.map((step, idx) => (
          <Fragment key={step}>
            <StepDot state={steps[step]} step={step} />
            {idx < STEP_ORDER.length - 1 && (
              <ConnectorBar state={steps[STEP_ORDER[idx + 1]]} prevState={steps[step]} />
            )}
          </Fragment>
        ))}
      </div>

      <div className="flex items-center" style={{ gap: 4, marginTop: 6 }}>
        {STEP_ORDER.map((step) => (
          <div
            key={step}
            style={{
              flex: 1,
              fontSize: 11.5,
              fontWeight: 720,
              textAlign: 'center',
              color: steps[step] === 'pending'
                ? 'rgba(255,255,255,0.32)'
                : 'rgba(255,255,255,0.85)',
            }}
          >
            {STEP_LABEL[step]}
          </div>
        ))}
      </div>

      {message && (
        <div
          className="flex items-start"
          style={{
            marginTop: 14,
            gap: 6,
            fontSize: 11.5,
            fontWeight: 680,
            color: TONE_COLORS[messageTone],
          }}
        >
          <span style={{ marginTop: 1 }}>●</span>
          <span style={{ flex: 1, lineHeight: 1.4 }}>{message}</span>
        </div>
      )}
    </div>
  );
}

function StepDot({ state, step }: { state: StepState; step: ConnectionStep }) {
  const size = 26;
  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.25s, color 0.25s',
  };

  if (state === 'pending') {
    return (
      <span style={{ ...baseStyle, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.32)' }}>
        <StepIcon step={step} />
      </span>
    );
  }
  if (state === 'active') {
    return (
      <span
        style={{
          ...baseStyle,
          background: 'rgba(174,188,255,0.18)',
          color: '#aebcff',
          boxShadow: '0 0 0 4px rgba(174,188,255,0.08)',
        }}
      >
        <Loader2 size={13} strokeWidth={2} className="anim-spin" />
      </span>
    );
  }
  if (state === 'done') {
    return (
      <span style={{ ...baseStyle, background: 'rgba(74,222,128,0.18)', color: '#4ade80' }}>
        <Check size={14} strokeWidth={2.4} />
      </span>
    );
  }
  return (
    <span style={{ ...baseStyle, background: 'rgba(255,107,107,0.18)', color: '#ff6b6b' }}>
      <XCircle size={14} strokeWidth={2} />
    </span>
  );
}

function ConnectorBar({ state, prevState }: { state: StepState; prevState: StepState }) {
  const isLit = prevState === 'done' && (state === 'active' || state === 'done');
  const isFailed = prevState === 'failed';

  return (
    <div
      style={{
        flex: 1,
        height: 2,
        background: isFailed
          ? 'rgba(255,107,107,0.25)'
          : isLit
            ? 'rgba(174,188,255,0.42)'
            : 'rgba(255,255,255,0.09)',
        transition: 'background 0.25s',
      }}
    />
  );
}

function StepIcon({ step }: { step: ConnectionStep }) {
  if (step === 'connect') {
    return (
      <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
        <path
          d="M6 4l-3 3 3 3M10 4l3 3-3 3"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (step === 'verify') {
    return (
      <svg width={14} height={14} viewBox="0 0 16 16" fill="none">
        <path d="M8 2 14 5v3.5C14 12 11 14 8 14s-6-2-6-5.5V5z" stroke="currentColor" strokeWidth={1.7} />
      </svg>
    );
  }
  return <Terminal size={13} strokeWidth={1.8} />;
}
