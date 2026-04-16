import type { ReactNode } from 'react';
import { Paperclip, Pencil, Plus, Send, Trash2, Wand2, Wrench, X } from 'lucide-react';

interface IAiChatPanelProps {
  /** Slot rendered between header and composer (chat content) */
  children?: ReactNode;
  width?: number | string;
  showCloseButton?: boolean;
  modelLabel?: string;
  contextUsage?: string;
  toolBadge?: number | string;
  skillBadge?: number | string;
  reasoningLabel?: string;
}

export function AiChatPanel({
  children,
  width = '38%',
  showCloseButton = true,
  modelLabel = 'DeepSeek V4 Flash',
  contextUsage = '0%',
  toolBadge = 20,
  skillBadge = 2,
  reasoningLabel = 'H',
}: IAiChatPanelProps) {
  return (
    <div
      className="flex flex-col shrink-0"
      style={{
        width,
        minWidth: 280,
        background: '#282936',
        borderLeft: '1px solid rgba(163,169,194,0.18)',
      }}
    >
      <div
        className="flex items-center shrink-0"
        style={{
          height: 35,
          padding: '0 11px',
          borderBottom: '1px solid rgba(163,169,194,0.18)',
          gap: 14,
        }}
      >
        <span style={{ fontSize: 10.8, fontWeight: 850, color: 'rgba(255,255,255,0.88)' }}>AI Chat</span>
        <div className="flex-1" />
        <ChatHeaderIcon><Plus size={12} strokeWidth={1.6} /></ChatHeaderIcon>
        <ChatHeaderIcon><Pencil size={11.5} strokeWidth={1.6} /></ChatHeaderIcon>
        <ChatHeaderIcon><Trash2 size={11.5} strokeWidth={1.6} /></ChatHeaderIcon>
        {showCloseButton && (
          <ChatHeaderIcon><X size={12} strokeWidth={1.6} /></ChatHeaderIcon>
        )}
      </div>

      <div className="relative flex-1 min-h-0 overflow-hidden" style={{ padding: '8px 12px' }}>
        {children}
      </div>

      <div className="shrink-0" style={{ padding: '8px 8px 9px' }}>
        <div
          style={{
            padding: '9px 10px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(166,180,228,0.33)',
            borderRadius: 13,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.34)',
              minHeight: 36,
            }}
          >
            Type a message...
          </div>
          <div className="flex items-center" style={{ gap: 9, marginTop: 4 }}>
            <ComposerIcon><Paperclip size={12} strokeWidth={1.7} /></ComposerIcon>
            <ComposerIconBadge icon={<Wrench size={11} strokeWidth={1.7} />} badge={toolBadge} tone="tool" />
            <ComposerIconBadge icon={<Wand2 size={11} strokeWidth={1.7} />} badge={skillBadge} tone="skill" />
            <ComposerIconBadge icon={<ReasoningGlyph />} badge={reasoningLabel} tone="reason" />
            <div className="flex-1" />
            <button
              type="button"
              className="flex items-center cursor-pointer"
              style={{
                gap: 4,
                padding: '2px 4px',
                fontSize: 10,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                color: 'rgba(255,255,255,0.7)',
                background: 'transparent',
                border: 'none',
                borderRadius: 4,
              }}
            >
              <ProviderGlyph />
              {modelLabel}
              <span style={{ fontSize: 9, opacity: 0.6 }}>▾</span>
            </button>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 10.5,
                color: 'rgba(255,255,255,0.36)',
                marginLeft: 6,
              }}
            >
              <ContextGlyph />
              {contextUsage}
            </span>
            <button
              type="button"
              className="flex items-center justify-center cursor-pointer"
              style={{
                width: 22,
                height: 22,
                marginLeft: 6,
                borderRadius: 7,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <Send size={11} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatHeaderIcon({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{ width: 14, height: 14, color: 'rgba(255,255,255,0.78)' }}
    >
      {children}
    </span>
  );
}

function ComposerIcon({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.5)' }}
    >
      {children}
    </span>
  );
}

const TONE_COLORS = {
  tool: '#5b8def',
  skill: '#a78bfa',
  reason: '#f59e0b',
} as const;

function ComposerIconBadge({
  icon,
  badge,
  tone,
}: {
  icon: ReactNode;
  badge: number | string;
  tone: keyof typeof TONE_COLORS;
}) {
  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.55)' }}
    >
      {icon}
      <span
        style={{
          position: 'absolute',
          top: -4,
          right: -7,
          minWidth: 12,
          height: 12,
          padding: '0 3px',
          borderRadius: 999,
          background: TONE_COLORS[tone],
          color: '#fff',
          fontSize: 8.5,
          fontWeight: 800,
          lineHeight: '12px',
          textAlign: 'center',
        }}
      >
        {badge}
      </span>
    </span>
  );
}

function ReasoningGlyph() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none">
      <path
        d="M5 12V4l5 8V4"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProviderGlyph() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none" style={{ color: 'rgba(255,255,255,0.7)' }}>
      <path
        d="M3 8 Q5 4 8 8 T13 8"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function ContextGlyph() {
  return (
    <svg width={10} height={10} viewBox="0 0 16 16" fill="none">
      <circle cx={8} cy={8} r={6} stroke="currentColor" strokeWidth={1.6} />
      <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}
