import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Time Calculator',
      format: 'Format',
      formats: {
        full: 'Days:Hours:Minutes:Seconds',
        hours: 'Hours:Minutes:Seconds',
        minutes: 'Minutes:Seconds',
        seconds: 'Seconds only',
      },
      units: {
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
      },
      operations: {
        add: 'Add',
        subtract: 'Subtract',
        multiply: 'Multiply',
        divide: 'Divide',
        equals: 'Equals',
        clear: 'Clear',
        clearEntry: 'CE',
      },
      theme: {
        light: 'Light',
        dark: 'Dark',
        toggle: 'Toggle theme',
      },
      language: {
        select: 'Language',
      },
    },
  },
  ja: {
    translation: {
      title: '時間計算機',
      format: '表示形式',
      formats: {
        full: '日:時:分:秒',
        hours: '時:分:秒',
        minutes: '分:秒',
        seconds: '秒のみ',
      },
      units: {
        days: '日',
        hours: '時間',
        minutes: '分',
        seconds: '秒',
      },
      operations: {
        add: '足す',
        subtract: '引く',
        multiply: 'かける',
        divide: '割る',
        equals: 'イコール',
        clear: 'クリア',
        clearEntry: 'クリア入力',
      },
      theme: {
        light: 'ライト',
        dark: 'ダーク',
        toggle: 'テーマ切り替え',
      },
      language: {
        select: '言語',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
