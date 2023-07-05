import { useTranslation } from "react-i18next";

import useDocumentTitle from "@hooks/useDocumentTitle";

import AdminConfigWebsiteDetailContact from "./Components/AdminConfigWebsiteDetailContact";
import AdminConfigWebsiteDetailGeneral from "./Components/AdminConfigWebsiteDetailGeneral";

const AdminConfigWebsiteDetail = () => {
  const { t } = useTranslation();

  useDocumentTitle(t("detailInfo"));

  return (
    <>
      <AdminConfigWebsiteDetailGeneral />
      <AdminConfigWebsiteDetailContact />
    </>
  );
};

export default AdminConfigWebsiteDetail;
