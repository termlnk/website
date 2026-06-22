import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/components/section-heading';
import { AiAgentCard } from './cards/ai-agent-card';
import { CloudSyncCard } from './cards/cloud-sync-card';
import { CrossPlatformCard } from './cards/cross-platform-card';
import { ExtensionsCard } from './cards/extensions-card';
import { IslandCard } from './cards/island-card';
import { McpCard } from './cards/mcp-card';
import { PortForwardCard } from './cards/port-forward-card';
import { SessionRestoreCard } from './cards/session-restore-card';
import { SshCard } from './cards/ssh-card';
import { SnippetsCard } from './cards/snippets-card';
import { TerminalCard } from './cards/terminal-card';
import { ThemesCard } from './cards/themes-card';
import { ZeroConfigCard } from './cards/zero-config-card';

export function BentoSection() {
  const { t } = useTranslation();

  return (
    <section className="px-6 pb-20 pt-24 md:pb-28 md:pt-32">
      <SectionHeading eyebrow="FEATURES" title={t('bento.title')} className="mb-16" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Row 1: [Terminal 2-col] [SSH 1-col] [Themes 1-col] */}
        <TerminalCard />
        <SshCard />
        <ThemesCard />

        {/* Row 2: [Cross-platform 1-col] [AI Agent 2-col] [Zero Config 1-col] */}
        <CrossPlatformCard />
        <AiAgentCard />
        <ZeroConfigCard />

        {/* Row 3: [Session Restore 1-col] [Extensions 1-col] [MCP Tools 2-col] */}
        <SessionRestoreCard />
        <ExtensionsCard />
        <McpCard />

        {/* Row 4: [Island 1-col] [Port Forward 1-col] [Snippets 1-col] [Cloud Sync 1-col] */}
        <IslandCard />
        <PortForwardCard />
        <SnippetsCard />
        <CloudSyncCard />
      </div>
    </section>
  );
}
