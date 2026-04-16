import { BellRing, BotMessageSquare, ClipboardCheck, Code2, History, LaptopMinimalCheck, PlugZap, Route, WandSparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FEATURES = [
  {
    key: 'zeroConfig',
    icon: (
      <WandSparkles size={24} strokeWidth={1.8} />
    ),
  },
  {
    key: 'everyAgent',
    icon: (
      <BotMessageSquare size={24} strokeWidth={1.8} />
    ),
  },
  {
    key: 'terminals',
    icon: (
      <LaptopMinimalCheck size={24} strokeWidth={1.8} />
    ),
  },
  {
    key: 'soundAlerts',
    icon: (
      <BellRing size={24} strokeWidth={1.8} />
    ),
  },
  {
    key: 'planReview',
    icon: (
      <ClipboardCheck size={24} strokeWidth={1.8} />
    ),
  },
  {
    key: 'native',
    icon: (
      <Code2 size={24} strokeWidth={1.8} />
    ),
  },
  {
    key: 'mcpTools',
    icon: (
      <PlugZap size={24} strokeWidth={1.8} />
    ),
  },
  {
    key: 'sessionRestore',
    icon: (
      <History size={24} strokeWidth={1.8} />
    ),
  },
  {
    key: 'sshTunnels',
    icon: (
      <Route size={24} strokeWidth={1.8} />
    ),
  },
] as const;

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section style={{ padding: '50px 24px 80px' }}>
      <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feat) => (
          <div
            key={feat.key}
            className="text-center"
            style={{
              padding: 24,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0, lineHeight: 0 }}>
                {feat.icon}
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {t(`features.${feat.key}.title`)}
              </h3>
            </div>
            <p
              style={{
                fontSize: 12,
                color: 'var(--color-muted)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {t(`features.${feat.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
