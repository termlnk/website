import { INPUT_BG, LINE, LINE_STRONG } from '../constants';
import { PanelFrame, Section } from '../ui';

const SHORTCUTS: Array<{ label: string; keys: string[] }> = [
  { label: 'Create New Host', keys: ['⌘', '⇧', 'N'] },
  { label: 'Delete Host', keys: ['⌘', '⌫'] },
  { label: 'New Local Terminal', keys: ['⌘', 'N'] },
  { label: 'Close Active Tab', keys: ['⌘', 'W'] },
  { label: 'Maximize/Restore Session', keys: ['⌘', 'Enter'] },
  { label: 'Open Settings', keys: ['⌘', ','] },
];

export function ShortcutsPanel() {
  return (
    <PanelFrame panel="shortcuts">
      <Section>
        {SHORTCUTS.map((shortcut, index) => (
          <div
            key={shortcut.label}
            className="flex items-center"
            style={{
              minHeight: 46,
              padding: '8px 16px',
              borderBottom: index < SHORTCUTS.length - 1 ? `1px solid ${LINE}` : undefined,
              gap: 8,
            }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 760 }}>{shortcut.label}</span>
            <div className="flex-1" />
            {shortcut.keys.map((key) => (
              <kbd
                key={key}
                style={{
                  minWidth: 22,
                  height: 22,
                  padding: '0 7px',
                  borderRadius: 5,
                  border: `1px solid ${LINE_STRONG}`,
                  background: INPUT_BG,
                  color: 'rgba(255,255,255,0.84)',
                  fontSize: 10,
                  fontWeight: 820,
                  lineHeight: '20px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {key}
              </kbd>
            ))}
          </div>
        ))}
      </Section>
    </PanelFrame>
  );
}
