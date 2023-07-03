import { Route, Routes } from "react-router-dom";

import AdminConfigWebsiteRoutes from "../ConfigWebsite/Routes/AdminConfigWebsiteRoutes";

const AdminConfigRoutes = () => {
  return (
    <Routes>
      <Route path="websites/*" element={<AdminConfigWebsiteRoutes />} />
    </Routes>
  );
};

export default AdminConfigRoutes;
