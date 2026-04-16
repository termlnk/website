import { Volume1, Volume2 } from 'lucide-react';
import { FAINT } from '../constants';
import { PanelFrame, Row, Section, Slider, SoundRow, SubGroup, Toggle } from '../ui';

export function IslandPanel() {
  return (
    <PanelFrame panel="island">
      <Section>
        <Row label="Enable Dynamic Island" desc="Show a floating status overlay near the macOS notch for agent sessions" control={<Toggle on />} last />
      </Section>
      <Section title="Sound">
        <div className="flex items-center" style={{ padding: '16px', gap: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 740, minWidth: 120 }}>Volume</span>
          <div className="flex-1" />
          <Volume1 size={14} strokeWidth={1.8} style={{ color: FAINT }} />
          <Slider value={45} width={150} />
          <Volume2 size={14} strokeWidth={1.8} style={{ color: FAINT }} />
          <span style={{ width: 40, textAlign: 'right', color: FAINT, fontSize: 10.5, fontWeight: 780 }}>45%</span>
        </div>
      </Section>
      <SubGroup label="Session">
        <SoundRow title="Session Start" desc="New Claude / Codex / Gemini session" />
        <SoundRow title="Task Complete" desc="AI finished its current response" />
        <SoundRow title="Task Error" desc="Tool failure or API error" last />
      </SubGroup>
      <SubGroup label="Interaction">
        <SoundRow title="Needs Approval" desc="Waiting for permission or answering a question" />
        <SoundRow title="Task Confirmed" desc="You sent a message" last />
      </SubGroup>
    </PanelFrame>
  );
}
