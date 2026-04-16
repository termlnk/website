import { AppWindowCluster } from '@/sections/demo/app-window/app-window-cluster';
import { useSyncedDemoState } from '@/sections/demo/hooks/use-synced-demo-state';
import { MacbookFrame } from '@/sections/demo/macbook-frame';
import { ApprovalLayer } from '@/sections/demo/notch/layers/approval-layer';
import { AskLayer } from '@/sections/demo/notch/layers/ask-layer';
import { CompactLayer } from '@/sections/demo/notch/layers/compact-layer';
import { JumpLayer } from '@/sections/demo/notch/layers/jump-layer';
import { OverviewLayer } from '@/sections/demo/notch/layers/overview-layer';
import { Notch } from '@/sections/demo/notch/notch';
import { SceneBar } from '@/sections/demo/scene-bar';

export function DemoSection() {
  const {
    notchState,
    handleNotchClick,
    handleAllow,
    handleDeny,
    handleAskOption,
    appState,
    jumpTo,
    sceneOrder,
  } = useSyncedDemoState();

  return (
    <section
      className="flex flex-col items-center"
      style={{ padding: '20px 24px 60px' }}
    >
      <MacbookFrame>
        {/* Notch */}
        <Notch
          scene={notchState.scene}
          size={notchState.size}
          shadow={notchState.shadow}
          onClick={handleNotchClick}
        >
          <CompactLayer active={notchState.scene === 'compact' || notchState.scene === 'approved'} />
          <OverviewLayer active={notchState.scene === 'overview'} />
          <ApprovalLayer active={notchState.scene === 'approval'} onAllow={handleAllow} onDeny={handleDeny} />
          <AskLayer active={notchState.scene === 'ask'} onOptionClick={handleAskOption} />
          <JumpLayer active={notchState.scene === 'jump'} />
        </Notch>

        {/* App window */}
        <AppWindowCluster activeScene={appState.activeScene} />
      </MacbookFrame>

      {/* Unified scene bar — drives both notch and app */}
      <SceneBar
        sceneOrder={sceneOrder}
        activeScene={appState.activeScene}
        duration={appState.duration}
        title={appState.title}
        description={appState.description}
        onSceneClick={jumpTo}
      />
    </section>
  );
}
