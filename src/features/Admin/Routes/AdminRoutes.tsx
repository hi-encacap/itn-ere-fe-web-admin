import { Route, Routes } from "react-router-dom";

import AdminLayout from "@common/Layout/AdminLayout";

import AdminCategory from "@admin/Category/AdminCategory";
import AdminContactRoutes from "@admin/Contact/Routes/AdminContactRoutes";
import AdminDashboard from "@admin/Dashboard/AdminDashboard";
import EstateRoutes from "@admin/Estate/Routes/EstateRoutes";
import AdminLocationRoutes from "@admin/Location/Routes/AdminLocationRoutes";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="categories/*" element={<AdminCategory />} />
        <Route path="contacts/*" element={<AdminContactRoutes />} />
        <Route path="estates/*" element={<EstateRoutes />} />
        <Route path="locations/*" element={<AdminLocationRoutes />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
