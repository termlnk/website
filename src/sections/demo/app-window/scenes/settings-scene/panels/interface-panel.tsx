import { InputBox, PanelFrame, Row, Section, SelectBox, Toggle } from '../ui';

export function InterfacePanel() {
  return (
    <PanelFrame panel="interface">
      <Section title="Font Settings">
        <Row label="Font Family" desc="Choose a font for the application UI" control={<SelectBox value="-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;" width={315} />} />
        <Row label="Font Size" desc="10 - 32 px" control={<InputBox value="14" width={96} />} last />
      </Section>
      <Section>
        <Row label="Enable Transparency" desc="Make the window translucent to reveal the desktop behind" control={<Toggle on={false} />} last />
      </Section>
    </PanelFrame>
  );
}
