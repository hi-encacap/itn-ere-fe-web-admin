import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import adminVi from "./vi/admin.json";
import commonVi from "./vi/common.json";
import featureVi from "./vi/feature.json";

export const resources = {
  vi: {
    common: commonVi,
    feature: featureVi,
    admin: adminVi,
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: "vi",
    ns: ["common", "feature", "admin"],
    interpolation: {
      escapeValue: false,
    },
    resources,
  })
  .catch((error) => {
    throw new Error(error);
  });
