import { useTranslation } from "react-i18next";

import useDocumentTitle from "@hooks/useDocumentTitle";

import AdminConfigWebsiteHomeHero from "./Components/AdminConfigWebsiteHomeHero";
import AdminConfigWebsiteHomeIntroduce from "./Components/AdminConfigWebsiteHomeIntroduce";

const AdminConfigWebsiteHome = () => {
  const { t } = useTranslation();

  useDocumentTitle(t("home"));

  return (
    <>
      <AdminConfigWebsiteHomeHero />
      <AdminConfigWebsiteHomeIntroduce />
    </>
  );
};

export default AdminConfigWebsiteHome;
