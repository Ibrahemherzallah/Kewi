import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher({ className = "" }) {
    const { i18n } = useTranslation();

    const setDir = (lng) => {
        const isRTL = lng === "ar";
        document.documentElement.lang = lng;
        document.documentElement.dir = isRTL ? "rtl" : "ltr";
        // optional: body class for fonts/colors per language
        document.body.classList.toggle("rtl", isRTL);
    };

    useEffect(() => {
        setDir(i18n.language);
    }, [i18n.language]);

    const toggle = () => {
        const next = i18n.language === "ar" ? "en" : "ar";
        i18n.changeLanguage(next);
    };

    return (
        <button type="button" onClick={toggle} className={className}>
            {i18n.language === "ar" ? "English" : "العربية"}
        </button>
    );
}
