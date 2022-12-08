import { Route, Routes } from 'react-router-dom';

import AdminCategory from '../AdminCategory';

const AdminCategoryRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminCategory />} />
    </Routes>
  );
};

export default AdminCategoryRoutes;
