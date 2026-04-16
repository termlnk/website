import type { ReactNode } from 'react';
import { ChevronRight, Copy, RefreshCw, Star } from 'lucide-react';
import { ACCENT, FAINT, LINE, MUTED, TEXT } from '../constants';
import { Button, PanelFrame, Section } from '../ui';

export function AboutPanel() {
  return (
    <PanelFrame panel="about">
      <Section>
        <div style={{ padding: '24px 18px 20px', textAlign: 'center' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #b867ff, #4ec7ff)',
              padding: 3,
              margin: '0 auto 11px',
              boxShadow: '0 10px 28px rgba(0,0,0,0.28)',
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 8,
                background: '#20242e',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: 16,
                fontWeight: 900,
              }}
            >
              ›_
            </div>
          </div>
          <div style={{ fontSize: 17, fontWeight: 900 }}>Termlnk</div>
          <div style={{ marginTop: 16, color: MUTED, fontSize: 10.5 }}>A modern terminal application</div>
          <div style={{ marginTop: 14, color: FAINT, fontSize: 10 }}>Copyright © 2026.</div>
          <div className="flex items-center justify-center" style={{ gap: 7, marginTop: 12 }}>
            {['App 0.0.0', 'Electron 40.9.2', 'Node 24.14.1'].map((item, index) => (
              <span
                key={item}
                style={{
                  padding: '2px 8px',
                  borderRadius: 999,
                  border: index === 2 ? '1px solid rgba(255,255,255,0.72)' : 'none',
                  background: 'rgba(174,188,255,0.16)',
                  color: TEXT,
                  fontSize: 9.5,
                  fontWeight: 820,
                }}
              >
                {item}
              </span>
            ))}
            <span className="flex items-center" style={{ gap: 5, fontSize: 10, fontWeight: 820 }}>
              <Copy size={12} strokeWidth={1.7} />
              Copy Environment
            </span>
          </div>
        </div>
      </Section>
      <Section tight>
        <div className="flex items-center" style={{ minHeight: 48, padding: '0 14px', gap: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.28)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 820 }}>Update check not started</div>
            <div style={{ marginTop: 4, color: FAINT, fontSize: 10 }}>v0.0.0 · Last Check Never</div>
          </div>
          <Button>
            <RefreshCw size={12} />
            {' '}
            Check for Updates
          </Button>
        </div>
      </Section>
      <Section tight>
        <AboutLink icon={<span style={{ fontSize: 15 }}>▤</span>} title="Release Notes" desc="View changelog for each published release" />
        <AboutLink icon={<Star size={15} strokeWidth={1.7} />} title="Project Repository" desc="Visit GitHub homepage and issue tracker" last />
      </Section>
    </PanelFrame>
  );
}

function AboutLink({ icon, title, desc, last = false }: { icon: ReactNode; title: string; desc: string; last?: boolean }) {
  return (
    <div
      className="flex items-center"
      style={{
        minHeight: 52,
        padding: '8px 16px',
        gap: 12,
        borderBottom: last ? undefined : `1px solid ${LINE}`,
      }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: title === 'Release Notes' ? 'rgba(226,146,76,0.26)' : 'rgba(174,188,255,0.12)',
          color: title === 'Release Notes' ? '#e6a35d' : ACCENT,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11.5, fontWeight: 820 }}>{title}</div>
        <div style={{ marginTop: 4, color: MUTED, fontSize: 10 }}>{desc}</div>
      </div>
      <ChevronRight size={14} strokeWidth={1.8} style={{ color: FAINT }} />
    </div>
  );
}
