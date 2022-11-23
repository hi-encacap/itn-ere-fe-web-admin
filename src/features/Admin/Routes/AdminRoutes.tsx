import { Route, Routes } from 'react-router-dom';

import AdminDashboard from '../Dashboard/AdminDashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
