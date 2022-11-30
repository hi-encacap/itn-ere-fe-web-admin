import { Route, Routes } from 'react-router-dom';

import AdminLayout from '@common/Layout/AdminLayout';

import AdminCategoryRoutes from '@admin/Category/Routes/AdminCategoryRoutes';
import AdminDashboard from '@admin/Dashboard/AdminDashboard';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="categories/*" element={<AdminCategoryRoutes />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
