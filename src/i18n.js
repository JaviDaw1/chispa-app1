import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',  // Puede ser es o cualquier otro idioma predeterminado
    supportedLngs: ['es', 'en', 'fr'],  // Añadimos francés
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',  // Ruta para cargar los archivos JSON
    },
  });

export default i18n;
