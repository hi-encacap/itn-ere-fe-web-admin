import { Route, Routes } from 'react-router-dom';

import AdminRoutes from '../../features/Admin/Routes/AdminRoutes';

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default CommonRoutes;
