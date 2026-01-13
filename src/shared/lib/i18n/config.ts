import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import heTranslations from './locales/he.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      he: {
        translation: heTranslations,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'translation',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Update HTML direction based on language
i18n.on('languageChanged', (lng) => {
  const html = document.documentElement;
  html.setAttribute('dir', lng === 'he' ? 'rtl' : 'ltr');
  html.setAttribute('lang', lng);
});

// Set initial direction
const initialLang = i18n.language || 'en';
document.documentElement.setAttribute('dir', initialLang === 'he' ? 'rtl' : 'ltr');
document.documentElement.setAttribute('lang', initialLang);

export default i18n;
