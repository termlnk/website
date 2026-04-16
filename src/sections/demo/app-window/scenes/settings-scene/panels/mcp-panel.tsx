import { Plus } from 'lucide-react';
import { LINE, MUTED } from '../constants';
import { Button, Field, PanelFrame, Row, Section, Tab, Toggle } from '../ui';

export function McpPanel() {
  return (
    <PanelFrame panel="mcp">
      <Section>
        <Row label="Built-in MCP Server" desc="Control the local MCP server" control={<Toggle on />} />
        <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr 1fr', gap: 12, padding: 14 }}>
          <Field label="Transport" value="HTTP" />
          <Field label="Host" value="0.0.0.0" />
          <Field label="Port" value="23580" />
        </div>
      </Section>
      <Section title="MCP Servers" tight>
        <ServerToolbar />
        <div style={{ padding: 22, textAlign: 'center', color: MUTED, fontSize: 10.5 }}>
          No matching MCP servers found
        </div>
      </Section>
    </PanelFrame>
  );
}

function ServerToolbar() {
  const tabs: Array<[string, string]> = [['Marketplace', '0'], ['Installed', '2'], ['Repositories', '0']];

  return (
    <div className="flex items-center" style={{ padding: 12, gap: 8, borderBottom: `1px solid ${LINE}` }}>
      {tabs.map(([label, count], index) => (
        <Tab key={label} label={label} count={count} active={index === 0} />
      ))}
      <div className="flex-1" />
      <Button variant="accent">
        <Plus size={12} />
        {' '}
        Add Server
      </Button>
    </div>
  );
}
