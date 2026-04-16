import { PanelFrame, Row, Section, SelectBox, Toggle } from '../ui';

export function AppearancePanel() {
  return (
    <PanelFrame panel="appearance">
      <Section title="Language Settings">
        <Row label="Language" control={<SelectBox value="English" />} last />
      </Section>
      <Section>
        <Row label="Enable System Tray" desc="Show an app icon in the system notification area with quick access menu" control={<Toggle on />} />
        <Row label="Minimize to Tray" desc="Hide the window to system tray when closing instead of quitting the app" control={<Toggle on />} last />
      </Section>
      <Section title="Startup">
        <Row label="Launch at Login" desc="Automatically start termlnk when you log into the system" control={<Toggle on={false} />} last />
      </Section>
    </PanelFrame>
  );
}
