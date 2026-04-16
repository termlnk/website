import { ChevronRight, Plus, RefreshCw, Settings } from 'lucide-react';
import { ACCENT, CARD_BG, LINE, TEXT } from '../constants';
import { InputBox, LabelLine, PanelFrame, SearchBox, Section, Toggle } from '../ui';

const PROVIDERS = [
  { name: 'OpenAI', key: 'openai', count: '3/41', active: true, mark: '◎' },
  { name: 'DeepSeek', key: 'deepseek', count: '2/2', active: true, mark: '◒' },
  { name: 'Moonshot', key: 'moonshot', count: '0/3', active: false, mark: '◓' },
  { name: 'Z.AI Coding Plan', key: 'zai', count: '0/13', active: false, mark: 'Z' },
  { name: 'Anthropic', key: 'anthropic', count: '0/23', active: false, mark: 'AI' },
  { name: 'Google Gemini', key: 'gemini', count: '0/27', active: false, mark: '◆' },
  { name: 'OpenRouter', key: 'openrouter', count: '0/254', active: false, mark: '↔' },
  { name: 'Azure OpenAI', key: 'azure', count: '0/44', active: false, mark: '▰' },
];

const OPENAI_MODELS = [
  { name: 'GPT-5.3 Codex', meta: '400K ctx   128K out   $1.75/$14.00' },
  { name: 'GPT-5.4', meta: '272K ctx   128K out   $2.50/$15.00' },
  { name: 'GPT-5.5', meta: '272K ctx   128K out   $3.00/$18.00' },
];

const DEEPSEEK_MODELS = [
  { name: 'DeepSeek V4 Flash', meta: '1.0M ctx   384K out   $0.14/$0.28' },
  { name: 'DeepSeek V4 Pro', meta: '1.0M ctx   384K out   $1.74/$3.48' },
];

interface IProviderView {
  title: string;
  key: string;
  url: string;
  count: string;
  models: Array<{ name: string; meta: string }>;
  defaultUrl: string;
}

export function ProviderPanel({ selected }: { selected: 'DeepSeek' | 'OpenAI' }) {
  const provider: IProviderView = selected === 'DeepSeek'
    ? {
      title: 'DeepSeek',
      key: 'deepseek',
      url: 'https://api.deepseek.com/v1',
      count: '2 / 2',
      models: DEEPSEEK_MODELS,
      defaultUrl: 'https://api.deepseek.com/v1',
    }
    : {
      title: 'OpenAI',
      key: 'openai',
      url: 'https://subscribe.try255.com',
      count: '3 / 41',
      models: OPENAI_MODELS,
      defaultUrl: 'https://api.openai.com/v1',
    };

  return (
    <PanelFrame panel="provider">
      <div className="flex h-full min-h-0" style={{ gap: 12 }}>
        <ProviderList selectedTitle={provider.title} />
        <ProviderDetail provider={provider} />
      </div>
    </PanelFrame>
  );
}

function ProviderList({ selectedTitle }: { selectedTitle: string }) {
  return (
    <div
      className="flex shrink-0 flex-col overflow-hidden"
      style={{
        width: 205,
        borderRadius: 10,
        border: `1px solid ${LINE}`,
        background: CARD_BG,
      }}
    >
      <div className="flex items-center" style={{ padding: '12px 14px', fontSize: 12, fontWeight: 850 }}>
        Providers
        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.62)', fontSize: 11 }}>25</span>
      </div>
      <div style={{ padding: '0 11px 11px' }}>
        <SearchBox placeholder="Search provider..." />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden" style={{ borderTop: `1px solid ${LINE}` }}>
        {PROVIDERS.map((item) => (
          <ProviderListItem key={item.key} provider={item} selected={item.name === selectedTitle} />
        ))}
      </div>
      <button
        type="button"
        className="flex items-center justify-center"
        style={{
          height: 35,
          gap: 6,
          border: 'none',
          borderTop: `1px solid ${LINE}`,
          background: 'rgba(255,255,255,0.025)',
          color: 'rgba(255,255,255,0.72)',
          fontSize: 10.5,
          fontWeight: 760,
        }}
      >
        <Plus size={13} />
        Add Provider
      </button>
    </div>
  );
}

function ProviderListItem({ provider, selected }: { provider: typeof PROVIDERS[number]; selected: boolean }) {
  return (
    <button
      type="button"
      className="flex w-full items-center"
      style={{
        height: 48,
        padding: '0 12px',
        gap: 10,
        border: 'none',
        borderBottom: `1px solid ${selected ? 'rgba(174,188,255,0.08)' : 'transparent'}`,
        background: selected ? 'rgba(174,188,255,0.16)' : 'transparent',
        color: selected ? TEXT : 'rgba(255,255,255,0.78)',
        textAlign: 'left',
        cursor: 'pointer',
      }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          color: selected ? ACCENT : 'rgba(255,255,255,0.28)',
          fontSize: 16,
          fontWeight: 900,
          flexShrink: 0,
        }}
      >
        {provider.mark}
      </span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: 'block', fontSize: 10.5, fontWeight: 830, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{provider.name}</span>
        <span style={{ display: 'block', marginTop: 2, fontSize: 10, color: 'rgba(255,255,255,0.68)' }}>
          {provider.count}
          {' '}
          Models
        </span>
      </span>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: provider.active ? ACCENT : 'rgba(255,255,255,0.2)' }} />
      <ChevronRight size={13} strokeWidth={1.8} style={{ color: 'rgba(255,255,255,0.58)' }} />
    </button>
  );
}

function ProviderDetail({ provider }: { provider: IProviderView }) {
  return (
    <div
      className="min-w-0 flex-1 overflow-hidden"
      style={{
        borderRadius: 10,
        border: `1px solid ${LINE}`,
        background: CARD_BG,
      }}
    >
      <div className="flex items-center" style={{ height: 58, padding: '0 14px', borderBottom: `1px solid ${LINE}` }}>
        <div>
          <div className="flex items-center" style={{ gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>{provider.title}</span>
            <span
              style={{
                padding: '2px 8px',
                borderRadius: 999,
                background: 'rgba(174,188,255,0.76)',
                fontSize: 10,
                fontWeight: 850,
              }}
            >
              Active
            </span>
          </div>
          <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.68)', fontSize: 10.5, fontWeight: 680 }}>{provider.key}</div>
        </div>
        <div className="flex-1" />
        <Toggle on />
      </div>

      <div className="h-full overflow-hidden" style={{ padding: 14 }}>
        <Section tight>
          <div style={{ padding: '13px 13px 12px' }}>
            <LabelLine label="API Key" />
            <InputBox secret />
            <div style={{ marginTop: 9, fontSize: 10, color: 'rgba(255,255,255,0.68)' }}>
              Used for model sync and requests to this provider.
            </div>
          </div>
        </Section>

        <Section tight>
          <div style={{ padding: '13px' }}>
            <div className="flex items-center" style={{ marginBottom: 9 }}>
              <LabelLine label="Base URL (Optional)" />
              <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 800, color: 'rgba(255,255,255,0.72)' }}>Use Default</span>
            </div>
            <InputBox value={provider.url} />
            <div style={{ marginTop: 9, fontSize: 10, color: 'rgba(255,255,255,0.68)' }}>
              Default Base URL:
              {' '}
              {provider.defaultUrl}
            </div>
          </div>
        </Section>

        <Section tight>
          <div className="flex items-center" style={{ padding: '11px 13px', borderBottom: `1px solid ${LINE}` }}>
            <span style={{ fontSize: 11.5, fontWeight: 820 }}>Models</span>
            <span style={{ marginLeft: 8, fontSize: 10.5, color: 'rgba(255,255,255,0.62)', fontWeight: 720 }}>{provider.count}</span>
            <div className="flex-1" />
            <RefreshCw size={12} style={{ color: TEXT }} />
            <span style={{ marginLeft: 4, fontSize: 10.5, fontWeight: 780 }}>fetch</span>
          </div>
          <div style={{ padding: 12 }}>
            <SearchBox placeholder="Search model..." />
            <div style={{ marginTop: 10 }}>
              {provider.models.map((model) => (
                <ModelRow key={model.name} name={model.name} meta={model.meta} />
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function ModelRow({ name, meta }: { name: string; meta: string }) {
  return (
    <div
      className="flex items-center"
      style={{
        minHeight: 42,
        padding: '7px 10px',
        borderRadius: 7,
        border: '1px solid rgba(255,255,255,0.045)',
        background: 'rgba(255,255,255,0.025)',
        marginBottom: 7,
        gap: 8,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 820 }}>{name}</div>
        <div style={{ marginTop: 4, color: 'rgba(255,255,255,0.56)', fontSize: 9.5, fontWeight: 650 }}>{meta}</div>
      </div>
      <div className="flex-1" />
      <Settings size={12} strokeWidth={1.7} style={{ color: 'rgba(255,255,255,0.52)' }} />
      <Toggle on />
    </div>
  );
}
