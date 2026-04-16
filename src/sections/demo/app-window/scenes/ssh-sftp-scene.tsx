import type { ConnectionStep, StepState } from '../parts/connection-progress';
import { ChevronDown, FolderSync, Home, RefreshCw, RotateCcw, Server } from 'lucide-react';
import { useSceneSubstate } from '@/hooks/use-scene-substate';
import { ConnectionProgress } from '../parts/connection-progress';
import { HostTree } from '../parts/host-tree';

const TARGET_HOST = 'HK-1H1G-500G';
const TARGET_ADDRESS = '47.243.123.45:22';

type Substep = 'connecting' | 'verifying' | 'connected';
const SUBSTEPS: readonly Substep[] = ['connecting', 'verifying', 'connected'] as const;
const DURATIONS = [2200, 1600, 4500] as const;

const STEP_PROGRESS: Record<Substep, Record<ConnectionStep, StepState>> = {
  connecting: { connect: 'active', verify: 'pending', shell: 'pending' },
  verifying: { connect: 'done', verify: 'active', shell: 'pending' },
  connected: { connect: 'done', verify: 'done', shell: 'done' },
};

interface ISshSftpSceneProps {
  active: boolean;
}

export function SshSftpScene({ active }: ISshSftpSceneProps) {
  const { step } = useSceneSubstate({
    active,
    steps: SUBSTEPS,
    durations: DURATIONS,
  });

  return (
    <div className="flex h-full" style={{ background: '#282936', color: 'rgba(255,255,255,0.9)' }}>
      <HostTree highlightHost={TARGET_HOST} />
      <main className="relative flex-1 min-w-0" style={{ background: '#282936' }}>
        {step === 'connected'
          ? <SftpDualPane />
          : (
            <ConnectingOverlay
              progress={STEP_PROGRESS[step]}
              message={step === 'connecting'
                ? 'Connecting to SSH server…'
                : 'Negotiating handshake…'}
            />
          )}
      </main>
    </div>
  );
}

function ConnectingOverlay({ progress, message }: { progress: Record<ConnectionStep, StepState>; message: string }) {
  return (
    <div className="flex h-full items-center justify-center">
      <ConnectionProgress
        hostName={TARGET_HOST}
        hostAddress={TARGET_ADDRESS}
        steps={progress}
        message={message}
      />
    </div>
  );
}

const LOCAL_FILES: ReadonlyArray<readonly [string, string, string, string]> = [
  ['alma', '--', '2026-02-28 11:46', 'rwxr-xr-x'],
  ['Applications', '--', '2026-04-24 20:26', 'rwxr-xr-x'],
  ['code', '--', '2025-06-09 13:29', 'rwxr-xr-x'],
  ['data', '--', '2024-09-10 21:16', 'rwxr-xr-x'],
  ['Desktop', '--', '2026-04-21 01:55', 'rwx------'],
  ['Documents', '--', '2026-04-24 17:18', 'rwx------'],
  ['Downloads', '--', '2026-04-26 00:43', 'rwx------'],
  ['Library', '--', '2026-01-18 19:32', 'rwx------'],
  ['work', '--', '2026-03-28 20:53', 'rwxr-xr-x'],
];

const REMOTE_FILES: ReadonlyArray<readonly [string, string, string, string]> = [
  ['bin.usr-is-merged', '--', '2024-02-26 20:58', 'rwxr-xr-x'],
  ['boot', '--', '2026-04-25 13:00', 'rwxr-xr-x'],
  ['dev', '--', '2026-04-25 12:58', 'rwxr-xr-x'],
  ['etc', '--', '2026-04-25 13:21', 'rwxr-xr-x'],
  ['home', '--', '2024-04-22 21:08', 'rwxr-xr-x'],
  ['lib.usr-is-merged', '--', '2024-04-08 22:37', 'rwxr-xr-x'],
  ['media', '--', '2025-08-05 20:57', 'rwxr-xr-x'],
  ['mnt', '--', '2025-08-05 20:57', 'rwxr-xr-x'],
  ['opt', '--', '2025-08-05 20:57', 'rwxr-xr-x'],
  ['proc', '--', '2026-04-25 12:57', 'r-xr-xr-x'],
  ['root', '--', '2026-04-25 13:19', 'rwx------'],
  ['tmp', '--', '2026-04-26 00:00', 'rwxrwxrwx'],
];

function SftpDualPane() {
  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center shrink-0"
        style={{
          height: 34,
          padding: '0 10px',
          borderBottom: '1px solid rgba(163,169,194,0.18)',
          background: '#2d2e3c',
          gap: 14,
        }}
      >
        <div className="flex items-center" style={{ gap: 7, fontSize: 13, fontWeight: 820 }}>
          <FolderSync size={15} strokeWidth={1.7} />
          <span>SFTP</span>
        </div>
        <div
          className="flex items-center"
          style={{
            height: 25,
            padding: '0 10px',
            borderRadius: 6,
            border: '1px solid rgba(163,169,194,0.18)',
            background: '#313341',
            fontSize: 12,
            fontWeight: 740,
            gap: 8,
          }}
        >
          <Server size={13} strokeWidth={1.6} />
          {TARGET_HOST}
          <ChevronDown size={11} strokeWidth={1.7} style={{ color: 'rgba(255,255,255,0.55)' }} />
        </div>
        <div className="flex-1" />
        <div className="flex items-center" style={{ gap: 16, fontSize: 11, fontWeight: 740, color: 'rgba(255,255,255,0.4)' }}>
          <span>↑↓ Transfers</span>
          <span>⌘ Disconnect</span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <FilePane title="LOCAL" pathSegments={['Users', 'telan']} files={LOCAL_FILES} count="22 items" hasBorder />
        <FilePane title="REMOTE" pathSegments={['/']} files={REMOTE_FILES} count="25 items" />
      </div>
    </div>
  );
}

interface IFilePaneProps {
  title: string;
  pathSegments: string[];
  files: ReadonlyArray<readonly [string, string, string, string]>;
  count: string;
  hasBorder?: boolean;
}

function FilePane({ title, pathSegments, files, count, hasBorder }: IFilePaneProps) {
  return (
    <div
      className="flex flex-col min-w-0"
      style={{
        width: '50%',
        borderRight: hasBorder ? '1px solid rgba(163,169,194,0.18)' : undefined,
      }}
    >
      <div
        className="flex items-center shrink-0"
        style={{ height: 30, padding: '0 10px', borderBottom: '1px solid rgba(163,169,194,0.16)', gap: 8 }}
      >
        <span style={{ fontSize: 10, fontWeight: 820, letterSpacing: 1, color: 'rgba(255,255,255,0.55)' }}>{title}</span>
        <Home size={12} strokeWidth={1.7} style={{ color: 'rgba(255,255,255,0.7)' }} />
        <span style={{ fontSize: 11, fontWeight: 720, color: 'rgba(255,255,255,0.85)' }}>
          {pathSegments.join(' / ')}
        </span>
        <div className="flex-1" />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.55)' }}>
          <RotateCcw size={11} strokeWidth={1.7} />
          <RefreshCw size={11} strokeWidth={1.7} />
        </span>
      </div>

      <div
        className="grid shrink-0"
        style={{
          height: 24,
          alignItems: 'center',
          gridTemplateColumns: '1.5fr 0.7fr 1fr 0.75fr',
          padding: '0 10px',
          borderBottom: '1px solid rgba(163,169,194,0.18)',
          fontSize: 10.5,
          fontWeight: 780,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        <span>Name ↑</span>
        <span>Size</span>
        <span>Modified</span>
        <span>Perms</span>
      </div>

      <div className="flex-1 overflow-hidden" style={{ paddingTop: 4 }}>
        {files.map(([name, size, modified, perms]) => (
          <div
            key={name}
            className="grid items-center"
            style={{
              gridTemplateColumns: '1.5fr 0.7fr 1fr 0.75fr',
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 690,
              lineHeight: 1.25,
            }}
          >
            <span className="flex items-center min-w-0" style={{ gap: 7 }}>
              <FolderGlyph />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.34)' }}>{size}</span>
            <span style={{ color: 'rgba(255,255,255,0.34)' }}>{modified}</span>
            <span style={{ color: 'rgba(255,255,255,0.34)' }}>{perms}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          height: 22,
          padding: '0 10px',
          borderTop: '1px solid rgba(163,169,194,0.18)',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 10,
          lineHeight: '22px',
        }}
      >
        {count}
      </div>
    </div>
  );
}

function FolderGlyph() {
  return (
    <svg width={14} height={12} viewBox="0 0 18 15" fill="none" style={{ color: '#e6f56b', flexShrink: 0 }}>
      <path
        d="M1.8 3.5h5l1.3 1.6h8.1v7.9H1.8z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}
