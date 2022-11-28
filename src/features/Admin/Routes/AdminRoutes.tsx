import { Route, Routes } from 'react-router-dom';

import AdminLayout from '../../Common/Layout/AdminLayout';
import AdminDashboard from '../Dashboard/AdminDashboard';

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
