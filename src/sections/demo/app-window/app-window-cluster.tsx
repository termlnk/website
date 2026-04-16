import type { AppDemoScene } from '@/sections/demo/types';
import { MockAppHeader } from './parts/mock-app-header';
import { MockSideTabBar } from './parts/mock-side-tab-bar';
import { SceneLayer } from './scene-layer';
import { AiAgentScene } from './scenes/ai-agent-scene';
import { SettingsScene } from './scenes/settings-scene';
import { SshSftpScene } from './scenes/ssh-sftp-scene';
import { TerminalScene } from './scenes/terminal-scene';

interface IAppWindowClusterProps {
  activeScene: AppDemoScene;
}

export function AppWindowCluster({ activeScene }: IAppWindowClusterProps) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ inset: '28px 0 18px', zIndex: 5 }}
    >
      <div
        style={{
          position: 'relative',
          width: '92%',
          height: '91%',
          borderRadius: 10,
          overflow: 'hidden',
          background: '#282936',
          border: '1px solid rgba(156,164,190,0.22)',
          boxShadow: '0 18px 48px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.03) inset',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MockAppHeader activeScene={activeScene} />

        <div className="flex flex-1 min-h-0">
          <MockSideTabBar activeScene={activeScene} />

          <div className="relative flex-1 min-w-0">
            <SceneLayer active={activeScene === 'terminal'}>
              <TerminalScene active={activeScene === 'terminal'} />
            </SceneLayer>
            <SceneLayer active={activeScene === 'ssh-sftp'}>
              <SshSftpScene active={activeScene === 'ssh-sftp'} />
            </SceneLayer>
            <SceneLayer active={activeScene === 'ai-agent'}>
              <AiAgentScene active={activeScene === 'ai-agent'} />
            </SceneLayer>
            <SceneLayer active={activeScene === 'settings'}>
              <SettingsScene active={activeScene === 'settings'} />
            </SceneLayer>
          </div>
        </div>
      </div>
    </div>
  );
}
