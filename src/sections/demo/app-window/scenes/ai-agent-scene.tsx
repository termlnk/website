import { ChevronDown, Sparkles } from 'lucide-react';
import { useSceneSubstate } from '@/hooks/use-scene-substate';
import { AiChatPanel } from '../parts/ai-chat-panel';
import { HostTree } from '../parts/host-tree';

interface IAiAgentSceneProps {
  active: boolean;
}

type ChatPhase = 'empty' | 'asked' | 'thinking' | 'tool-create' | 'tool-run' | 'answered';

const PHASES: readonly ChatPhase[] = ['empty', 'asked', 'thinking', 'tool-create', 'tool-run', 'answered'] as const;
const DURATIONS = [1500, 1400, 1200, 1300, 1300, 4500] as const;

const PHASE_INDEX: Record<ChatPhase, number> = {
  empty: 0,
  asked: 1,
  thinking: 2,
  'tool-create': 3,
  'tool-run': 4,
  answered: 5,
};

export function AiAgentScene({ active }: IAiAgentSceneProps) {
  const { step } = useSceneSubstate({ active, steps: PHASES, durations: DURATIONS });
  const reachedFastfetch = PHASE_INDEX[step] >= PHASE_INDEX['tool-run'];

  return (
    <div className="flex h-full" style={{ background: '#282936', color: 'rgba(255,255,255,0.92)' }}>
      <HostTree />

      <main className="flex-1 min-w-0 relative" style={{ background: '#282936' }}>
        <FastfetchTerminal showOutput={reachedFastfetch} />
      </main>

      <AiChatPanel showCloseButton width="40%">
        <ChatStream phase={step} />
      </AiChatPanel>
    </div>
  );
}

function FastfetchTerminal({ showOutput }: { showOutput: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 14,
        left: 14,
        right: 14,
        bottom: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: 9.8,
        lineHeight: 1.45,
      }}
    >
      <div style={{ color: 'rgba(255,255,255,0.85)' }}>
        <span style={{ color: '#51f283', fontWeight: 800, marginRight: 12 }}>➜</span>
        <span style={{ color: '#9eafe6', marginRight: 12 }}>~</span>
        {showOutput && <span style={{ color: 'rgba(255,255,255,0.85)' }}>fastfetch</span>}
        {!showOutput && (
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 12,
              border: '1px solid rgba(255,255,255,0.92)',
              verticalAlign: -2,
              animation: 'vi-pulse 1.25s ease-in-out infinite',
            }}
          />
        )}
      </div>

      {showOutput && (
        <div style={{ marginTop: 12 }}>
          <AppleLogo />
          <div style={{ color: 'rgba(255,255,255,0.86)' }}>
            <div>
              <span style={{ color: '#aebcff', fontWeight: 800 }}>telan</span>
              @
              <span style={{ color: '#aebcff', fontWeight: 800 }}>telanMBP</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)' }}>--------------------</div>
            <FfRow label="OS" value="macOS Tahoe 26.4.1 arm64" />
            <FfRow label="Host" value="MacBookPro 16,2 (M3 Max)" />
            <FfRow label="Kernel" value="Darwin 25.4.0" />
            <FfRow label="Uptime" value="5 hours, 8 mins" />
            <FfRow label="Packages" value="140 (brew), 2 (brew-cask)" />
            <FfRow label="Shell" value="zsh 5.9" />
            <FfRow label="Display" value="3600x2338 @ 120 Hz" />
            <FfRow label="DE" value="Aqua" />
            <FfRow label="Terminal" value="Termlnk" />
            <FfRow label="CPU" value="Apple M3 Max (16) @ 4.05 GHz" />
            <FfRow label="GPU" value="Apple M3 Max (40) @ 1.40 GHz" />
            <FfRow label="Memory" value="38.62 GiB / 64.00 GiB (60%)" />
            <FfRow label="Disk (/)" value="411.32 GiB / 926.35 GiB (44%) - apfs" />
          </div>
        </div>
      )}
    </div>
  );
}

function FfRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <span style={{ color: '#aebcff', fontWeight: 800 }}>{label}</span>
      <span style={{ color: 'rgba(255,255,255,0.4)' }}>: </span>
      <span>{value}</span>
    </div>
  );
}

function AppleLogo() {
  return null;

  /*
  return (
    <pre
      style={{
        margin: 0,
        color: '#aebcff',
        fontSize: 7.6,
        lineHeight: 1.05,
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'pre',
      }}
    >
      {`            'c.
         ,xNMM.
       .OMMMMo
       OMMM0,
     .;loddo:' loopl'.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`}
    </pre>
  );
  */
}

function ChatStream({ phase }: { phase: ChatPhase }) {
  const idx = PHASE_INDEX[phase];

  if (idx === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.32)', fontSize: 13 }}>
        Start a conversation
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ gap: 10 }}>
      <UserBubble text="Open the local terminal and run fastfetch" />

      {idx >= PHASE_INDEX.thinking && <ThinkingRow />}
      {idx >= PHASE_INDEX['tool-create'] && (
        <ToolCallRow label="termlnk_terminal_create_session" status="done" />
      )}
      {idx >= PHASE_INDEX['tool-run'] && (
        <ToolCallRow
          label="termlnk_terminal_run"
          status={idx === PHASE_INDEX['tool-run'] ? 'running' : 'done'}
        />
      )}
      {idx >= PHASE_INDEX.answered && <AnswerBlock />}
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div
        style={{
          maxWidth: '86%',
          padding: '8px 11px',
          borderRadius: 10,
          fontSize: 10.5,
          fontWeight: 720,
          color: 'rgba(255,255,255,0.92)',
          background: '#4a4b61',
        }}
      >
        {text}
      </div>
    </div>
  );
}

function ThinkingRow() {
  return (
    <div className="flex items-center" style={{ gap: 6, color: 'rgba(255,255,255,0.4)', fontSize: 9.8, fontWeight: 720 }}>
      <ChevronDown size={11} strokeWidth={1.6} />
      Thinking
      <ThinkingDots />
    </div>
  );
}

function ThinkingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 3, marginLeft: 4 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            animation: `vi-pulse 1.05s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function ToolCallRow({ label, status }: { label: string; status: 'running' | 'done' }) {
  const color = status === 'done' ? '#4ade80' : '#fbbf24';
  return (
    <div
      className="inline-flex items-center self-start"
      style={{
        gap: 8,
        height: 20,
        padding: '0 9px',
        borderRadius: 6,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.05)',
        fontSize: 9.8,
        fontWeight: 720,
      }}
    >
      <Sparkles size={10} strokeWidth={1.7} style={{ color }} />
      <span style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>{label}</span>
      <span
        style={{
          marginLeft: 4,
          fontSize: 8.5,
          fontWeight: 800,
          color,
          letterSpacing: 0.5,
        }}
      >
        {status === 'done' ? '✓' : '●'}
      </span>
    </div>
  );
}

function AnswerBlock() {
  return (
    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10.2, lineHeight: 1.48, fontWeight: 700 }}>
      <p style={{ margin: '6px 0 6px' }}>Here's your system info:</p>
      <p style={{ margin: '0 0 6px', fontWeight: 900 }}>
        telan@Mac — macOS Tahoe 26.4.1 (arm64)
      </p>
      <ul style={{ margin: 0, paddingLeft: 14, color: 'rgba(255,255,255,0.78)' }}>
        <li>Machine: MacBook Pro 14", M3 Max</li>
        <li>Kernel: Darwin 25.4.0</li>
        <li>Uptime: 5h 8m</li>
        <li>Packages: 140 (brew), 2 (brew-cask)</li>
        <li>Shell: zsh 5.9</li>
        <li>Display: 3600×2338 @ 120 Hz</li>
      </ul>
    </div>
  );
}
