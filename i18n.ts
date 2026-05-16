import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import deTranslation from './locales/de.json';
import nlTranslation from './locales/nl.json';
import jaTranslation from './locales/ja.json';
import taTranslation from './locales/ta.json';

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  de: { translation: deTranslation },
  nl: { translation: nlTranslation },
  ja: { translation: jaTranslation },
  ta: { translation: taTranslation }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
