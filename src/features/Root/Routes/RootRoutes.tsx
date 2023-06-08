import { Route, Routes } from "react-router-dom";

import RootLayout from "@common/Layout/RootLayout";

import AdminDashboard from "@admin/Dashboard/AdminDashboard";

import RootCategory from "../Category/Category";

const RootRoutes = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="categories/*" element={<RootCategory />} />
      </Routes>
    </RootLayout>
  );
};

export default RootRoutes;
