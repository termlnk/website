import { Check, Sparkles } from 'lucide-react';
import { ACCENT, FAINT, MUTED } from '../constants';
import { Field, PanelFrame, Section, Slider } from '../ui';

export function ChatPanel() {
  return (
    <PanelFrame panel="chat">
      <Section title="Auto Compact" icon={<Sparkles size={13} strokeWidth={1.8} />}>
        <div style={{ padding: '14px 16px 16px' }}>
          <div className="flex items-start" style={{ gap: 10 }}>
            <span
              className="flex items-center justify-center"
              style={{ width: 14, height: 14, borderRadius: 3, background: ACCENT, marginTop: 1 }}
            >
              <Check size={10} strokeWidth={3} />
            </span>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 820 }}>Enable auto compact</div>
              <div style={{ maxWidth: 560, marginTop: 8, fontSize: 10, color: MUTED, lineHeight: 1.35 }}>
                Automatically compact history when the conversation approaches the model context window. Conversation can continue indefinitely without manual intervention.
              </div>
            </div>
          </div>
          <div className="flex items-center" style={{ marginTop: 19 }}>
            <span style={{ fontSize: 11.5, fontWeight: 820 }}>Compact threshold</span>
            <span style={{ marginLeft: 'auto', color: ACCENT, fontSize: 12, fontWeight: 850 }}>80%</span>
          </div>
          <Slider value={80} />
          <div className="flex" style={{ justifyContent: 'space-between', marginTop: 8, color: FAINT, fontSize: 9.5, fontWeight: 700 }}>
            <span>Early (5%)</span>
            <span>Late (95%)</span>
          </div>
          <div style={{ marginTop: 11, color: MUTED, fontSize: 10, lineHeight: 1.35 }}>
            Triggers compaction when context usage exceeds this percentage. Lower values leave more headroom; higher values preserve more raw content.
          </div>
          <div style={{ marginTop: 18 }}>
            <Field label="Recent messages to keep" value="4" />
            <div style={{ marginTop: 8, color: MUTED, fontSize: 10 }}>
              Most recent messages kept verbatim and excluded from the summary (2-20).
            </div>
          </div>
        </div>
      </Section>
    </PanelFrame>
  );
}
