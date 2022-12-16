import { Route, Routes } from 'react-router-dom';

import AdminLocationDistrictList from '../District/AdminLocationDistrictList';
import AdminLocationProvinceList from '../Province/AdminLocationProvinceList';

const AdminLocationRoutes = () => {
  return (
    <Routes>
      <Route path="provinces" element={<AdminLocationProvinceList />} />
      <Route path="districts" element={<AdminLocationDistrictList />} />
    </Routes>
  );
};

export default AdminLocationRoutes;
