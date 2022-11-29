import { Route, Routes } from 'react-router-dom';

import AdminLayout from '@common/Layout/AdminLayout';

import AdminDashboard from '@admin/Dashboard/AdminDashboard';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
