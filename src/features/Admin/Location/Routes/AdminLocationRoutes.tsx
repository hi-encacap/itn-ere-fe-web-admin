import { Route, Routes } from 'react-router-dom';

import AdminLocationProvinceList from '../Province/AdminLocationProvinceList';

const AdminLocationRoutes = () => {
  return (
    <Routes>
      <Route path="provinces" element={<AdminLocationProvinceList />} />
    </Routes>
  );
};

export default AdminLocationRoutes;
