import { Route, Routes } from "react-router-dom";

import RootLayout from "@common/Layout/RootLayout";

import AdminCategoryRoutes from "@admin/Category/Routes/AdminCategoryRoutes";
import AdminDashboard from "@admin/Dashboard/AdminDashboard";

const RootRoutes = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="categories/*" element={<AdminCategoryRoutes />} />
      </Routes>
    </RootLayout>
  );
};

export default RootRoutes;
