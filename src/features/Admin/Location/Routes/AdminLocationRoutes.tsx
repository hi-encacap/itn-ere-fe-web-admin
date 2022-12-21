import { Route, Routes } from 'react-router-dom';

import AdminLocationDistrictList from '../District/AdminLocationDistrictList';
import AdminLocationProvinceList from '../Province/AdminLocationProvinceList';
import AdminLocationWardList from '../Ward/AdminLocationWardList';

const AdminLocationRoutes = () => {
  return (
    <Routes>
      <Route path="provinces" element={<AdminLocationProvinceList />} />
      <Route path="districts" element={<AdminLocationDistrictList />} />
      <Route path="wards" element={<AdminLocationWardList />} />
    </Routes>
  );
};

export default AdminLocationRoutes;
