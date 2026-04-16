import { InputBox, PanelFrame, Row, Section, SelectBox, Toggle } from '../ui';

export function TerminalPanel() {
  return (
    <PanelFrame panel="terminal">
      <Section title="Local Terminal">
        <Row label="Default Shell" desc="Choose which shell starts when opening a new local terminal session" control={<SelectBox value="System Default" width={170} />} last />
      </Section>
      <Section title="Terminal Settings">
        <Row label="Font" desc="Choose a terminal font from system fonts" control={<SelectBox value="&quot;JetBrains Mono&quot;, Menlo, Monaco, &quot;Courier New&quot;" width={315} />} />
        <Row label="Font Size" desc="8 - 24 px" control={<InputBox value="12" width={84} />} />
        <Row label="Letter Spacing" desc="-5 - 10 px" control={<InputBox value="0" width={84} />} />
        <Row label="Cursor Style" desc="Choose the cursor shape in the terminal" control={<SelectBox value="Bar" width={84} />} />
        <Row label="Cursor Blink" desc="Animate the terminal cursor while focused" control={<Toggle on />} last />
      </Section>
    </PanelFrame>
  );
}
