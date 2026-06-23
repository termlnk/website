export interface DocNavItem {
  slug: string;
  titleKey: string;
}

export interface DocNavSection {
  titleKey: string;
  items: DocNavItem[];
}

export const DOCS_NAV: DocNavSection[] = [
  {
    titleKey: 'docs.nav.gettingStarted',
    items: [
      { slug: '', titleKey: 'docs.nav.overview' },
      { slug: 'quick-start', titleKey: 'docs.nav.quickStart' },
    ],
  },
  {
    titleKey: 'docs.nav.features',
    items: [
      { slug: 'terminal', titleKey: 'docs.nav.terminal' },
      { slug: 'ssh', titleKey: 'docs.nav.ssh' },
      { slug: 'sftp', titleKey: 'docs.nav.sftp' },
      { slug: 'port-forwarding', titleKey: 'docs.nav.portForwarding' },
      { slug: 'snippets', titleKey: 'docs.nav.snippets' },
      { slug: 'ai-agent', titleKey: 'docs.nav.aiAgent' },
      { slug: 'mcp', titleKey: 'docs.nav.mcp' },
    ],
  },
  {
    titleKey: 'docs.nav.customization',
    items: [
      { slug: 'themes', titleKey: 'docs.nav.themes' },
      { slug: 'extensions', titleKey: 'docs.nav.extensions' },
      { slug: 'keybindings', titleKey: 'docs.nav.keybindings' },
    ],
  },
  {
    titleKey: 'docs.nav.more',
    items: [
      { slug: 'web', titleKey: 'docs.nav.web' },
      { slug: 'faq', titleKey: 'docs.nav.faq' },
    ],
  },
];
