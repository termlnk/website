import { Check, Moon, Sun } from 'lucide-react';
import { ACCENT, INPUT_BG, LINE, TEXT } from '../constants';
import { PanelFrame, Section } from '../ui';

const DARK_THEMES = [
  { name: 'Aquarium', colors: ['#202334', '#c7d6f8', '#b8e0bc', '#efb7b2', '#e9b3d9', '#414652'] },
  { name: 'Ashes', colors: ['#1c1f24', '#94a7b7', '#b9c99f', '#cc9692', '#b99ad4', '#3a4043'] },
  { name: 'Ayu Dark', colors: ['#0f1419', '#36a9e1', '#b8cc52', '#f07178', '#c792ea', '#262b33'] },
  { name: 'Bearded Arc', colors: ['#202634', '#65c8ff', '#38ef7d', '#ff738a', '#c99cff', '#3b4659'] },
  { name: 'Cappuccin', colors: ['#1e1e2e', '#89b4fa', '#a6e3a1', '#f38ba8', '#cba6f7', '#45475a'] },
  { name: 'Chadracula', colors: ['#202334', '#a8baf0', '#55fb8a', '#ff706b', '#c990ff', '#555864'] },
  { name: 'Chadracula Evondev', colors: ['#1f1d2e', '#28c4f4', '#55fb8a', '#ff5d62', '#b787f5', '#3d426a'] },
  { name: 'Chadtain', colors: ['#1b2025', '#719bb8', '#9ab28f', '#b58a84', '#aaa2c8', '#293039'] },
  { name: 'Chocolate', colors: ['#1d1517', '#86a1af', '#91aa88', '#c75c56', '#9c8395', '#383838'] },
  { name: 'Decay', colors: ['#1c2229', '#89b4fa', '#7fd7b2', '#ef6173', '#cb8ff2', '#384047'] },
  { name: 'Doom Chad', colors: ['#22272e', '#36a9e1', '#9bc56d', '#ff695d', '#d879e7', '#414953'] },
  { name: 'Everbush', colors: ['#111b1d', '#63b3ed', '#98d67b', '#f47067', '#d774d4', '#2b333d'] },
  { name: 'Everforest', colors: ['#253336', '#7fbbb3', '#a7c080', '#e67e80', '#e6a0b8', '#313b42'] },
  { name: 'Falcon', colors: ['#020221', '#519fdf', '#8bccbf', '#ff761a', '#a1a8c9', '#2d2b55'] },
  { name: 'Flexoki', colors: ['#100f0f', '#4385be', '#879a39', '#d14d41', '#8b7ec8', '#343331'] },
  { name: 'Gatekeeper', colors: ['#101417', '#2eb6ff', '#00f283', '#ff2b67', '#c5b4d8', '#2b2c31'] },
];

const LIGHT_THEMES = [
  { name: 'Ayu Light', colors: ['#f8f9fa', '#2498d5', '#6cbf43', '#f0524f', '#a33be5', '#c5c5c5'] },
  { name: 'Blossom Light', colors: ['#f7efed', '#597a91', '#778765', '#bc8266', '#ae87a0', '#b6b2b0'] },
  { name: 'Everforest Light', colors: ['#fffbea', '#3193ba', '#6a9d00', '#d65d4a', '#bc6e8f', '#c8c1a8'] },
  { name: 'Flex Light', colors: ['#fffcf0', '#4385be', '#879a39', '#d14d41', '#8b7ec8', '#cecdc3'] },
  { name: 'Flexoki Light', colors: ['#fffcf0', '#205ea6', '#66800b', '#af3029', '#5e409d', '#cecdc3'] },
  { name: 'Github Light', colors: ['#ffffff', '#0969da', '#116329', '#cf222e', '#8250df', '#d0d7de'] },
  { name: 'Gruvbox Light', colors: ['#fbf1c7', '#458588', '#98971a', '#d65d0e', '#b16286', '#d5c4a1'] },
  { name: 'Material Lighter', colors: ['#fafafa', '#6182b8', '#91b859', '#e53935', '#7c4dff', '#c2c2c2'] },
  { name: 'Nano Light', colors: ['#f2f2f2', '#2aa1e6', '#69b76f', '#ff5f57', '#6d43b8', '#d1d1d1'] },
  { name: 'Oceanic Light', colors: ['#f7f9fb', '#4f7eb5', '#99b65d', '#d24a43', '#a17faf', '#cad0d6'] },
  { name: 'One Light', colors: ['#fafafa', '#2f70d6', '#50a14f', '#e45649', '#a67ec8', '#d0d0d0'] },
  { name: 'One Nord Light', colors: ['#e5e9f0', '#3b7bbf', '#8fbc8f', '#bf616a', '#b48ead', '#d8dee9'] },
  { name: 'Penumbra Light', colors: ['#fff7ed', '#7aa2f7', '#45b787', '#d16674', '#b76cc6', '#ded6ca'] },
  { name: 'Rose Pine Dawn', colors: ['#faf4ed', '#56949f', '#286983', '#d7827e', '#907aa9', '#cecacd'] },
];

export function ColorSchemePanel() {
  const showLight = false;
  const themes = showLight ? LIGHT_THEMES : DARK_THEMES;

  return (
    <PanelFrame panel="colorscheme">
      <Section
        title={showLight ? 'Light Themes' : 'Dark Themes'}
        desc={`Choose a ${showLight ? 'light' : 'dark'} theme color scheme to apply in the terminal UI.`}
        icon={showLight ? <Sun size={13} strokeWidth={1.8} /> : <Moon size={13} strokeWidth={1.8} />}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 11,
            padding: 14,
          }}
        >
          {themes.map((theme) => (
            <ThemeCard key={theme.name} name={theme.name} colors={theme.colors} selected={theme.name === 'Chadracula'} />
          ))}
        </div>
      </Section>
    </PanelFrame>
  );
}

function ThemeCard({ name, colors, selected }: { name: string; colors: string[]; selected?: boolean }) {
  return (
    <button
      type="button"
      style={{
        height: 66,
        borderRadius: 8,
        border: selected ? `1.3px solid ${ACCENT}` : `1px solid ${LINE}`,
        background: INPUT_BG,
        padding: '10px 9px',
        position: 'relative',
        textAlign: 'left',
        boxShadow: selected ? '0 0 0 2px rgba(174,188,255,0.14)' : undefined,
        cursor: 'pointer',
      }}
    >
      <div className="flex" style={{ gap: 6 }}>
        {colors.map((color, index) => (
          <span
            key={`${name}-${color}-${index}`}
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: color,
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          />
        ))}
      </div>
      <span style={{ position: 'absolute', left: 9, bottom: 9, color: TEXT, fontSize: 10.5, fontWeight: 830 }}>{name}</span>
      {selected && (
        <span
          className="flex items-center justify-center"
          style={{
            position: 'absolute',
            right: 9,
            top: 9,
            width: 15,
            height: 15,
            borderRadius: '50%',
            background: ACCENT,
            color: '#fff',
          }}
        >
          <Check size={10} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}
