import type { AppDemoScene } from '@/sections/demo/types';
import { Bot, Files, LayoutGrid, Settings } from 'lucide-react';

interface IMockSideTabBarProps {
  activeScene: AppDemoScene;
}

interface TabItem { id: string; icon: React.ReactNode; activeOn: AppDemoScene[] }

const TABS: TabItem[] = [
  {
    id: 'hosts',
    activeOn: ['terminal', 'ssh-sftp'],
    icon: <Files strokeWidth={1.6} size={17} />,
  },
  {
    id: 'layout',
    activeOn: ['settings'],
    icon: <LayoutGrid strokeWidth={1.6} size={17} />,
  },
  {
    id: 'agent',
    activeOn: ['ai-agent'],
    icon: <Bot strokeWidth={1.6} size={17} />,
  },
];

export function MockSideTabBar({ activeScene }: IMockSideTabBarProps) {
  return (
    <div
      className="flex flex-col items-center shrink-0"
      style={{
        width: 34,
        paddingTop: 10,
        paddingBottom: 9,
        gap: 12,
        background: '#292b38',
        borderRight: '1px solid rgba(168,176,204,0.18)',
        boxShadow: 'inset -1px 0 rgba(0,0,0,0.22)',
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.activeOn.includes(activeScene);
        return (
          <div
            key={tab.id}
            className="relative flex items-center justify-center"
            style={{
              width: 24,
              height: 24,
              color: isActive ? 'rgba(255,255,255,0.96)' : 'rgba(214,218,232,0.46)',
              transition: 'color 0.18s ease',
            }}
          >
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  left: -4,
                  top: -6,
                  bottom: -6,
                  width: 2,
                  borderRadius: 2,
                  background: '#aebcff',
                  boxShadow: '0 0 10px rgba(174,188,255,0.42)',
                }}
              />
            )}
            {tab.icon}
          </div>
        );
      })}
      <div style={{ flex: 1 }} />
      <div
        className="flex items-center justify-center"
        style={{ width: 24, height: 24, color: 'rgba(214,218,232,0.46)' }}
      >
        <Settings strokeWidth={1.5} size={15} />
      </div>
    </div>
  );
}
