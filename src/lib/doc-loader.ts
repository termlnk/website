import { useTranslation } from 'react-i18next';

const modules: Record<string, Record<string, string>> = {};

const zhCNFiles = import.meta.glob('/src/content/docs/zh-CN/*.md', { eager: true, query: '?raw', import: 'default' });
const enFiles = import.meta.glob('/src/content/docs/en/*.md', { eager: true, query: '?raw', import: 'default' });

for (const [path, content] of Object.entries(zhCNFiles)) {
  const name = path.split('/').pop()!.replace('.md', '');
  modules[name] = modules[name] || {};
  modules[name]['zh-CN'] = content as string;
}

for (const [path, content] of Object.entries(enFiles)) {
  const name = path.split('/').pop()!.replace('.md', '');
  modules[name] = modules[name] || {};
  modules[name].en = content as string;
}

export function useDocContent(slug: string): string {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;

  const langMap = modules[slug];
  if (!langMap) return '';

  if (lang.startsWith('zh')) return langMap['zh-CN'] || langMap.en || '';
  if (langMap[lang]) return langMap[lang];
  return langMap.en || '';
}
