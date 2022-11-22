import { Route, Routes } from 'react-router-dom';

import DashboardRoutes from '../../features/Dashboard/Routes/DashboardRoutes';

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<DashboardRoutes />} />
    </Routes>
  );
};

export default CommonRoutes;
