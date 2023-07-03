import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";

import LayoutContent from "@common/Layout/Components/LayoutContent";

import AdminConfigWebsiteSidebar from "../Components/AdminConfigWebsiteSidebar";
import AdminConfigWebsiteDetail from "../ConfigWebsiteDetail/AdminConfigWebsiteDetail";
import AdminConfigWebsiteHome from "../ConfigWebsiteHome/AdminConfigWebsiteHome";

const AdminConfigWebsiteRoutes = () => {
  const { t } = useTranslation();

  return (
    <LayoutContent title={t("siteConfigManagement")} isBlank>
      <div className="grid grid-cols-12 gap-x-8">
        <AdminConfigWebsiteSidebar className="col-span-3" />
        <div className="col-span-9 flex flex-col space-y-8">
          <Routes>
            <Route path="*" element={<AdminConfigWebsiteDetail />} />
            <Route path="homes" element={<AdminConfigWebsiteHome />} />
          </Routes>
        </div>
      </div>
    </LayoutContent>
  );
};

export default AdminConfigWebsiteRoutes;
