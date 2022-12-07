import { Route, Routes } from 'react-router-dom';

import AdminLayout from '@common/Layout/AdminLayout';

import AdminCategoryRoutes from '@admin/Category/Routes/AdminCategoryRoutes';
import AdminContactRoutes from '@admin/Contact/Routes/AdminContactRoutes';
import AdminDashboard from '@admin/Dashboard/AdminDashboard';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="categories/*" element={<AdminCategoryRoutes />} />
        <Route path="contacts/*" element={<AdminContactRoutes />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
