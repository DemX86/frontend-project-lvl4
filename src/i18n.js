import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales/index.js';

// todo что делать с promise
i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
