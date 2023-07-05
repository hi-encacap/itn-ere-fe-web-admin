import { Route, Routes } from "react-router-dom";

import AdminLayout from "@common/Layout/AdminLayout";

import AdminCategory from "@admin/Category/AdminCategory";
import AdminConfigRoutes from "@admin/Config/Routes/AdminRoutes";
import AdminContactRoutes from "@admin/Contact/Routes/AdminContactRoutes";
import AdminDashboard from "@admin/Dashboard/AdminDashboard";
import EstateRoutes from "@admin/Estate/Routes/EstateRoutes";
import AdminLocationRoutes from "@admin/Location/Routes/AdminLocationRoutes";
import AdminPostRoutes from "@admin/Post/Routes/AdminPostRoutes";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="categories/*" element={<AdminCategory />} />
        <Route path="contacts/*" element={<AdminContactRoutes />} />
        <Route path="posts/*" element={<AdminPostRoutes />} />
        <Route path="estates/*" element={<EstateRoutes />} />
        <Route path="locations/*" element={<AdminLocationRoutes />} />
        <Route path="configs/*" element={<AdminConfigRoutes />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
