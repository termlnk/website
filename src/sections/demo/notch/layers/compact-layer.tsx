import { NotchLayer } from '../notch';
import { AGENT_COLORS, PixelPet } from '../notch-shared';

export function CompactLayer({ active }: { active: boolean }) {
  return (
    <NotchLayer active={active} className="!justify-between !pl-[11px] !pr-2.5">
      <span className="flex items-center justify-center shrink-0">
        <PixelPet color={AGENT_COLORS['claude-code']} variant="compact" />
      </span>
      <span
        className="flex items-center justify-center shrink-0"
        aria-label="1 active session"
        style={{
          width: 16,
          height: 16,
          borderRadius: 5,
          background: 'rgba(255,255,255,0.14)',
          color: 'rgba(255,255,255,0.78)',
          fontSize: 10,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        1
      </span>
    </NotchLayer>
  );
}
