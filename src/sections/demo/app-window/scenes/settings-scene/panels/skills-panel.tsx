import { ChevronRight, GitBranch, Plus, RefreshCw, Trash2, Wand2 } from 'lucide-react';
import { FAINT, LINE, MUTED } from '../constants';
import { Button, PanelFrame, Section, Tab, Toggle } from '../ui';

export function SkillsPanel() {
  return (
    <PanelFrame panel="skills">
      <Section title="Skills" desc="Manage local skills, browse Marketplace capabilities, and control what your agent can use.">
        <div
          className="flex items-center"
          style={{
            margin: 12,
            padding: '8px 10px',
            borderRadius: 10,
            border: `1px solid ${LINE}`,
            background: 'rgba(255,255,255,0.02)',
            gap: 8,
          }}
        >
          <Tab icon={<span style={{ fontSize: 11 }}>▦</span>} label="Marketplace" count="0" />
          <Tab icon={<Wand2 size={12} />} label="Installed" count="2" active />
          <Tab icon={<GitBranch size={12} />} label="Repositories" count="0" />
          <div className="flex-1" />
          <Button>
            <RefreshCw size={12} />
            {' '}
            Refresh
          </Button>
          <Button variant="accent">
            <Plus size={12} />
            {' '}
            Add Repo
          </Button>
        </div>
        <div style={{ padding: '0 12px 14px' }}>
          <div style={{ marginBottom: 8, color: FAINT, fontSize: 10, fontWeight: 850, letterSpacing: 0.7 }}>USER (2)</div>
          <SkillRow name="code-review" path="/Users/telan/.config/termlnk/skills/code-review" />
          <SkillRow name="terminal-helper" path="/Users/telan/.config/termlnk/skills/terminal-helper" />
        </div>
      </Section>
    </PanelFrame>
  );
}

function SkillRow({ name, path }: { name: string; path: string }) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 62,
        borderRadius: 9,
        border: `1px solid ${LINE}`,
        background: 'rgba(255,255,255,0.025)',
        padding: '0 14px',
        marginBottom: 10,
        gap: 12,
      }}
    >
      <ChevronRight size={13} strokeWidth={1.8} style={{ color: 'rgba(255,255,255,0.72)' }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 860 }}>{name}</span>
          <span style={{ padding: '2px 8px', borderRadius: 999, background: 'rgba(45,141,88,0.34)', color: '#6ee79c', fontSize: 9.5, fontWeight: 850 }}>User</span>
        </div>
        <div style={{ marginTop: 7, color: MUTED, fontSize: 10.5, fontWeight: 650 }}>{path}</div>
      </div>
      <Trash2 size={13} strokeWidth={1.7} style={{ color: 'rgba(255,255,255,0.7)' }} />
      <Toggle on />
    </div>
  );
}
