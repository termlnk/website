import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import jaCommon from './locales/ja/common.json';
import koCommon from './locales/ko/common.json';
import zhCNCommon from './locales/zh-CN/common.json';
import zhTWCommon from './locales/zh-TW/common.json';

const resources = {
  en: { common: enCommon },
  'zh-CN': { common: zhCNCommon },
  'zh-TW': { common: zhTWCommon },
  ja: { common: jaCommon },
  ko: { common: koCommon },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    supportedLngs: ['en', 'zh-CN', 'zh-TW', 'ja', 'ko'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

document.documentElement.lang = i18n.resolvedLanguage || 'en';
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export { i18n };
