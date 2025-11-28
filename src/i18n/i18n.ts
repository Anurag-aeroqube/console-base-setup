import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./locales/en";
import hindi from "./locales/hi";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources: {
      en: english,
      hi: hindi,
    },
  });

export default i18n;
