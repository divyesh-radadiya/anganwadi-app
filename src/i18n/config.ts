import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('./locales/en/translations.json')
    },
    hn: {
      translations: require('./locales/hn/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18next.languages = ['en','hn'];

export default i18next