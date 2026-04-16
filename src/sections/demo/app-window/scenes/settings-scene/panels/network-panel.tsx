import { Button, Field, PanelFrame, Row, Section, SelectBox, Toggle } from '../ui';

export function NetworkPanel() {
  return (
    <PanelFrame panel="network">
      <Section>
        <Row label="Enable Proxy" desc="Control global network proxy within the application" control={<Toggle on />} />
        <div style={{ padding: '14px 16px 15px' }}>
          <div className="flex justify-end" style={{ marginBottom: 16 }}>
            <SelectBox value="HTTP" width={142} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '14px 16px' }}>
            <Field label="Proxy Host" value="127.0.0.1" />
            <Field label="Proxy Port" value="10808" />
            <Field label="Username (Optional)" placeholder="Username (Optional)" />
            <Field label="Password (Optional)" placeholder="Password (Optional)" secret />
          </div>
          <div style={{ marginTop: 15 }}>
            <Button>Test Proxy</Button>
          </div>
        </div>
      </Section>
    </PanelFrame>
  );
}
