import { NotchLayer } from '../notch';

interface IAskLayerProps {
  active: boolean;
  onOptionClick: () => void;
}

const OPTIONS = ['Preview', 'QA Sandbox', 'Current machine'];

export function AskLayer({ active, onOptionClick }: IAskLayerProps) {
  return (
    <NotchLayer active={active} className="flex-col !items-stretch !justify-start gap-1 !p-2">
      {/* Header */}
      <div className="flex items-center gap-1.5" style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-question)' }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="var(--color-question)" opacity={0.9}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        Agent Question
      </div>

      {/* Question */}
      <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
        Which environment should I use?
      </div>

      {/* Options */}
      <div className="flex flex-col gap-0.5">
        {OPTIONS.map((opt, i) => (
          <button
            key={opt}
            className="flex items-center gap-2 w-full border-none cursor-pointer text-left"
            onClick={(e) => {
              e.stopPropagation();
              onOptionClick();
            }}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              background: 'rgba(6,182,212,0.15)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.9)',
              fontFamily: 'inherit',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(6,182,212,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(6,182,212,0.15)';
            }}
          >
            <span
              className="flex items-center justify-center shrink-0"
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                background: 'rgba(6,182,212,0.6)',
                width: 18,
                height: 18,
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {i + 1}
            </span>
            {opt}
          </button>
        ))}
      </div>
    </NotchLayer>
  );
}
