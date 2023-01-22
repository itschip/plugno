import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locale/en.json";
import no from "./locale/no.json";

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    no: no,
  },
  lng: "en",
});

export default i18n;
