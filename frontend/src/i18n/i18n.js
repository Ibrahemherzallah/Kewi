
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "./locals/ar/translation.json";
import en from "./locals/en/translation.json";

i18n
    .use(LanguageDetector) // detects from localStorage, navigator, querystring, etc.
    .use(initReactI18next)
    .init({
        resources: {
            ar: { translation: ar },
            en: { translation: en }
        },
        fallbackLng: "ar",
        supportedLngs: ["ar", "en"],
        detection: {
            order: ["localStorage", "querystring", "navigator", "htmlTag"],
            caches: ["localStorage"]
        },
        interpolation: { escapeValue: false }
    });

export default i18n;
